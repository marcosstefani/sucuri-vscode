import * as vscode from 'vscode';
import { SucuriCompletionProvider } from './completion';

export function activate(context: vscode.ExtensionContext): void {
    context.subscriptions.push(
        vscode.languages.registerCompletionItemProvider(
            { language: 'sucuri' },
            new SucuriCompletionProvider(),
            ...SucuriCompletionProvider.triggerCharacters
        )
    );
}

export function deactivate(): void {
    // Nothing to dispose beyond the subscriptions registered on activation.
}
