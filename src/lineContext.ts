export type LineContext =
    | { kind: 'lineStart'; word: string }
    | { kind: 'attributeName'; tag?: string; builtinMacro: boolean }
    | { kind: 'attributeValue'; tag?: string; attribute: string }
    | { kind: 'interpolation'; word: string }
    | { kind: 'filter' }
    | { kind: 'loopVariable'; word: string }
    | { kind: 'path'; directive: 'include' | 'extends' | 'css' | 'js'; typed: string }
    | { kind: 'macro'; word: string }
    | { kind: 'controlFlow' };

interface ParenScan {
    /** Index of the outermost `(` still open at the cursor, or -1. */
    openParen: number;
    /** Index of the quote character still open at the cursor, or -1. */
    openQuote: number;
}

function scanParensAndQuotes(prefix: string): ParenScan {
    let depth = 0;
    let openParen = -1;
    let quote = '';
    let openQuote = -1;

    for (let index = 0; index < prefix.length; index++) {
        const char = prefix[index];
        if (quote) {
            if (char === quote) {
                quote = '';
                openQuote = -1;
            }
            continue;
        }
        if (char === '"' || char === "'") {
            quote = char;
            openQuote = index;
        } else if (char === '(') {
            if (depth === 0) {
                openParen = index;
            }
            depth++;
        } else if (char === ')') {
            depth = Math.max(0, depth - 1);
            if (depth === 0) {
                openParen = -1;
            }
        }
    }

    return { openParen, openQuote };
}

/** Interpolation, filter and loop-variable contexts share the same free-text scanning. */
function scanText(text: string): LineContext | undefined {
    const lastOpen = text.lastIndexOf('{');
    const lastClose = text.lastIndexOf('}');

    if (lastOpen > lastClose) {
        const inner = text.slice(lastOpen + 1);
        if (inner.includes('|')) {
            return { kind: 'filter' };
        }
        return { kind: 'interpolation', word: inner.trim() };
    }

    if (/#[A-Za-z_][A-Za-z0-9_.]*[ \t]*\|[ \t]*[A-Za-z_]*$/.test(text)) {
        return { kind: 'filter' };
    }

    const loopVariable = /#([A-Za-z_][A-Za-z0-9_.]*)?$/.exec(text);
    if (loopVariable) {
        return { kind: 'loopVariable', word: loopVariable[1] ?? '' };
    }

    return undefined;
}

function tagBefore(prefix: string, end: number): string | undefined {
    const head = prefix.slice(0, end);
    const match = /^\s*([A-Za-z][A-Za-z0-9-]*)(?:[#.][A-Za-z0-9_-]+)*$/.exec(head);
    return match?.[1];
}

export function analyzeLine(prefix: string): LineContext | undefined {
    const pathDirective = /^\s*(include|extends|css|js)[ \t]+(\S*)$/.exec(prefix);
    if (pathDirective) {
        return {
            kind: 'path',
            directive: pathDirective[1] as 'include' | 'extends' | 'css' | 'js',
            typed: pathDirective[2]
        };
    }

    const { openParen, openQuote } = scanParensAndQuotes(prefix);

    if (openQuote >= 0) {
        const insideQuote = prefix.slice(openQuote + 1);
        const textContext = scanText(insideQuote);
        if (textContext) {
            return textContext;
        }
        if (openParen >= 0 && openQuote > openParen) {
            const attribute = /([A-Za-z0-9_.-]+)[ \t]*=[ \t]*$/.exec(prefix.slice(openParen + 1, openQuote));
            if (attribute) {
                return { kind: 'attributeValue', tag: tagBefore(prefix, openParen), attribute: attribute[1] };
            }
        }
        return undefined;
    }

    if (openParen >= 0) {
        const tag = tagBefore(prefix, openParen);
        const macro = /^\s*\+[A-Za-z0-9/._-]+$/.test(prefix.slice(0, openParen));
        if (macro) {
            return undefined;
        }
        return {
            kind: 'attributeName',
            tag,
            builtinMacro: tag === 'list' || tag === 'table'
        };
    }

    const textContext = scanText(prefix);
    if (textContext) {
        return textContext;
    }

    const macro = /^\s*\+([A-Za-z0-9/._-]*)$/.exec(prefix);
    if (macro) {
        return { kind: 'macro', word: macro[1] };
    }

    if (/<[A-Za-z]*$/.test(prefix)) {
        return { kind: 'controlFlow' };
    }

    const lineStart = /^\s*([A-Za-z][A-Za-z0-9-]*)?$/.exec(prefix);
    if (lineStart) {
        return { kind: 'lineStart', word: lineStart[1] ?? '' };
    }

    return undefined;
}
