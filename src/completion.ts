import * as path from 'node:path';
import * as vscode from 'vscode';
import { indexDocument, loopVariableMembers, loopVariablesInScope } from './documentIndex';
import { AttributeInfo, HTML_TAGS, attributesForTag, findAttribute } from './htmlData';
import { analyzeLine, LineContext } from './lineContext';
import { BUILTIN_FILTERS, BUILTIN_MACROS, CONTROL_FLOW, DIRECTIVES, KeywordInfo } from './sucuriData';

// Space is deliberately absent: it would pop the widget on every indentation keystroke.
const TRIGGER_CHARACTERS = ['(', '{', '#', '+', '<', '|', '.', '"', "'", '/'];

const RETRIGGER: vscode.Command = {
    command: 'editor.action.triggerSuggest',
    title: 'Suggest'
};

function keywordItem(keyword: KeywordInfo, kind: vscode.CompletionItemKind, sortPrefix: string): vscode.CompletionItem {
    const item = new vscode.CompletionItem(keyword.label, kind);
    item.insertText = new vscode.SnippetString(keyword.insertText);
    item.documentation = new vscode.MarkdownString(keyword.description);
    item.sortText = sortPrefix + keyword.label;
    return item;
}

function attributeItem(attribute: AttributeInfo, sortPrefix: string): vscode.CompletionItem {
    const item = new vscode.CompletionItem(attribute.name, vscode.CompletionItemKind.Property);
    item.sortText = sortPrefix + attribute.name;

    if (attribute.boolean) {
        item.detail = 'boolean attribute';
        item.insertText = attribute.name;
    } else {
        item.insertText = new vscode.SnippetString(`${attribute.name}="$0"`);
        if (attribute.values?.length) {
            item.command = RETRIGGER;
        }
    }

    if (attribute.description) {
        item.documentation = new vscode.MarkdownString(attribute.description);
    }

    return item;
}

function tagItems(): vscode.CompletionItem[] {
    return HTML_TAGS.map((tag) => {
        const item = new vscode.CompletionItem(tag.name, vscode.CompletionItemKind.Class);
        item.detail = tag.void ? 'void element' : 'HTML element';
        item.documentation = new vscode.MarkdownString(tag.description);
        item.sortText = `3${tag.name}`;
        return item;
    });
}

function variableItems(names: string[], kind: vscode.CompletionItemKind, sortPrefix: string, detail: string): vscode.CompletionItem[] {
    return names.map((name) => {
        const item = new vscode.CompletionItem(name, kind);
        item.detail = detail;
        item.sortText = sortPrefix + name;
        return item;
    });
}

function filterItems(text: string): vscode.CompletionItem[] {
    const builtin = BUILTIN_FILTERS.map((filter) => keywordItem(filter, vscode.CompletionItemKind.Function, '1'));
    const builtinNames = new Set(BUILTIN_FILTERS.map((filter) => filter.label));
    const custom = indexDocument(text)
        .filters.filter((name) => !builtinNames.has(name))
        .map((name) => {
            const item = new vscode.CompletionItem(name, vscode.CompletionItemKind.Function);
            item.detail = 'custom filter';
            item.documentation = new vscode.MarkdownString('Registered in Python with `env.register_filter`.');
            item.sortText = `2${name}`;
            return item;
        });

    return [...builtin, ...custom];
}

function lineStartItems(text: string): vscode.CompletionItem[] {
    return [
        ...DIRECTIVES.map((directive) => keywordItem(directive, vscode.CompletionItemKind.Keyword, '0')),
        ...CONTROL_FLOW.map((keyword) => keywordItem(keyword, vscode.CompletionItemKind.Snippet, '1')),
        ...BUILTIN_MACROS.map((macro) => keywordItem(macro, vscode.CompletionItemKind.Function, '2')),
        ...tagItems(),
        ...indexDocument(text).macros.map((name) => {
            const item = new vscode.CompletionItem(`+${name}`, vscode.CompletionItemKind.Function);
            item.detail = 'included macro';
            item.insertText = `+${name}`;
            item.sortText = `0+${name}`;
            return item;
        })
    ];
}

function attributeValueItems(context: Extract<LineContext, { kind: 'attributeValue' }>): vscode.CompletionItem[] {
    const attribute = findAttribute(context.tag, context.attribute);
    if (!attribute?.values?.length) {
        return [];
    }

    return attribute.values.map((value, index) => {
        const item = new vscode.CompletionItem(value, vscode.CompletionItemKind.Value);
        item.sortText = String(index).padStart(3, '0');
        return item;
    });
}

async function pathItems(
    document: vscode.TextDocument,
    context: Extract<LineContext, { kind: 'path' }>
): Promise<vscode.CompletionItem[]> {
    const folder = vscode.workspace.getWorkspaceFolder(document.uri);
    if (!folder) {
        return [];
    }

    const extension = context.directive === 'css' ? 'css' : context.directive === 'js' ? 'js' : 'suc';
    const found = await vscode.workspace.findFiles(
        new vscode.RelativePattern(folder, `**/*.${extension}`),
        '**/node_modules/**',
        500
    );

    // Sucuri resolves include/extends/css/js relative to the directory of the current template.
    const baseDir = path.dirname(document.uri.fsPath);

    return found
        .filter((uri) => uri.fsPath !== document.uri.fsPath)
        .map((uri) => {
            const relative = path.relative(baseDir, uri.fsPath).split(path.sep).join('/');
            const label = extension === 'suc' ? relative.replace(/\.suc$/, '') : relative;
            const item = new vscode.CompletionItem(label, vscode.CompletionItemKind.File);
            item.detail = vscode.workspace.asRelativePath(uri);
            item.sortText = `${label.startsWith('..') ? '1' : '0'}${label}`;
            return item;
        });
}

function interpolationItems(text: string, lines: string[], line: number): vscode.CompletionItem[] {
    const index = indexDocument(text);
    return [
        ...variableItems(loopVariablesInScope(lines, line), vscode.CompletionItemKind.Variable, '0', 'loop variable'),
        ...variableItems(index.variables, vscode.CompletionItemKind.Variable, '1', 'context variable')
    ];
}

function loopVariableItems(text: string, lines: string[], line: number, typed: string): vscode.CompletionItem[] {
    const dot = typed.indexOf('.');
    if (dot >= 0) {
        const root = typed.slice(0, dot);
        return variableItems(loopVariableMembers(text, root), vscode.CompletionItemKind.Field, '0', `member of #${root}`);
    }

    return variableItems(loopVariablesInScope(lines, line), vscode.CompletionItemKind.Variable, '0', 'loop variable');
}

export class SucuriCompletionProvider implements vscode.CompletionItemProvider {
    static readonly triggerCharacters = TRIGGER_CHARACTERS;

    async provideCompletionItems(
        document: vscode.TextDocument,
        position: vscode.Position
    ): Promise<vscode.CompletionItem[] | undefined> {
        const prefix = document.lineAt(position.line).text.slice(0, position.character);
        const context = analyzeLine(prefix);
        if (!context) {
            return undefined;
        }

        const text = document.getText();
        const lines = text.split(/\r?\n/);

        switch (context.kind) {
            case 'attributeName': {
                const items = attributesForTag(context.tag).map((attribute, index) =>
                    attributeItem(attribute, String(index).padStart(3, '0'))
                );
                if (context.builtinMacro) {
                    items.push(...interpolationItems(text, lines, position.line));
                }
                return items;
            }
            case 'attributeValue':
                return attributeValueItems(context);
            case 'interpolation':
                return interpolationItems(text, lines, position.line);
            case 'filter':
                return filterItems(text);
            case 'loopVariable':
                return loopVariableItems(text, lines, position.line, context.word);
            case 'path':
                return pathItems(document, context);
            case 'macro':
                return indexDocument(text).macros.map((name) => {
                    const item = new vscode.CompletionItem(name, vscode.CompletionItemKind.Function);
                    item.detail = 'included macro';
                    item.command = RETRIGGER;
                    return item;
                });
            case 'controlFlow':
                return CONTROL_FLOW.map((keyword) => {
                    const item = keywordItem(keyword, vscode.CompletionItemKind.Snippet, '0');
                    // The `<` is already typed, so it must not be inserted twice.
                    item.range = new vscode.Range(position.translate(0, -openTagLength(prefix)), position);
                    return item;
                });
            case 'lineStart':
                return lineStartItems(text);
        }
    }
}

function openTagLength(prefix: string): number {
    const match = /<[A-Za-z]*$/.exec(prefix);
    return match ? match[0].length : 0;
}
