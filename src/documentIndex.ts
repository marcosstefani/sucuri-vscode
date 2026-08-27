import * as path from 'node:path';

export interface DocumentIndex {
    /** Macro names usable with `+name`, derived from `include` statements. */
    macros: string[];
    blocks: string[];
    watches: string[];
    /** Context variable paths seen in `{...}` interpolations. */
    variables: string[];
    /** Custom filter names already used in the document. */
    filters: string[];
}

const INCLUDE = /^\s*include[ \t]+(\S+)\s*$/;
const BLOCK = /^\s*block[ \t]+([A-Za-z0-9_]+)\s*$/;
const WATCH = /^\s*watch[ \t]+([A-Za-z0-9_]+)\s*$/;
const INTERPOLATION = /\{([^{}]*)\}/g;
const FOR_OPEN = /^\s*<for[ \t]+([A-Za-z_]\w*)[ \t]+in[ \t]+/;
const FOR_CLOSE = /^\s*<endfor>/;

export function indexDocument(text: string): DocumentIndex {
    const macros = new Set<string>();
    const blocks = new Set<string>();
    const watches = new Set<string>();
    const variables = new Set<string>();
    const filters = new Set<string>();

    for (const line of text.split(/\r?\n/)) {
        const include = INCLUDE.exec(line);
        if (include) {
            macros.add(path.basename(include[1], '.suc'));
        }

        const block = BLOCK.exec(line);
        if (block) {
            blocks.add(block[1]);
        }

        const watch = WATCH.exec(line);
        if (watch) {
            watches.add(watch[1]);
        }

        for (const match of line.matchAll(INTERPOLATION)) {
            const [expression, ...applied] = match[1].split('|');
            const name = expression.trim();
            if (/^[A-Za-z_][A-Za-z0-9_.]*$/.test(name)) {
                variables.add(name);
            }
            for (const filter of applied) {
                const filterName = filter.trim();
                if (/^[A-Za-z_]\w*$/.test(filterName)) {
                    filters.add(filterName);
                }
            }
        }
    }

    return {
        macros: [...macros],
        blocks: [...blocks],
        watches: [...watches],
        variables: [...variables],
        filters: [...filters]
    };
}

/** Loop variables of the `<for>` blocks enclosing `line`, innermost first. */
export function loopVariablesInScope(lines: string[], line: number): string[] {
    const variables: string[] = [];
    let unmatchedEndfor = 0;

    for (let current = line - 1; current >= 0; current--) {
        const text = lines[current] ?? '';
        if (FOR_CLOSE.test(text)) {
            unmatchedEndfor++;
            continue;
        }
        const open = FOR_OPEN.exec(text);
        if (!open) {
            continue;
        }
        if (unmatchedEndfor > 0) {
            unmatchedEndfor--;
        } else if (!variables.includes(open[1])) {
            variables.push(open[1]);
        }
    }

    return variables;
}

/** Dotted members used on a loop variable, e.g. `name` and `tags` for `#item.name` / `<for t in item.tags>`. */
export function loopVariableMembers(text: string, variable: string): string[] {
    if (!/^[A-Za-z_]\w*$/.test(variable)) {
        return [];
    }

    const members = new Set<string>();
    const suffix = '((?:\\.[A-Za-z0-9_]+)+)';
    const patterns = [
        new RegExp(`#${variable}${suffix}`, 'g'),
        new RegExp(`\\{[ \\t]*${variable}${suffix}`, 'g'),
        new RegExp(`<for[ \\t]+[A-Za-z_]\\w*[ \\t]+in[ \\t]+${variable}${suffix}`, 'g')
    ];

    for (const pattern of patterns) {
        for (const match of text.matchAll(pattern)) {
            members.add(match[1].slice(1));
        }
    }

    return [...members];
}
