export interface KeywordInfo {
    label: string;
    /** Snippet body inserted after the keyword, `${...}` placeholders included. */
    insertText: string;
    description: string;
}

export const BUILTIN_FILTERS: KeywordInfo[] = [
    { label: 'upper', insertText: 'upper', description: 'Converts the value to UPPERCASE' },
    { label: 'lower', insertText: 'lower', description: 'Converts the value to lowercase' },
    { label: 'title', insertText: 'title', description: 'Capitalizes The First Letter Of Each Word' },
    {
        label: 'safe',
        insertText: 'safe',
        description: 'Renders raw HTML without escaping.\n\n**Warning:** bypasses XSS protection, only use on trusted content.'
    }
];

export const DIRECTIVES: KeywordInfo[] = [
    {
        label: 'include',
        insertText: 'include ${1:path/to/template}',
        description: 'Imports another `.suc` template as a macro. Call it with `+name`.'
    },
    {
        label: 'extends',
        insertText: 'extends ${1:layout}',
        description: 'Inherits a parent layout and overrides its `block` regions.'
    },
    {
        label: 'block',
        insertText: 'block ${1:name}',
        description: 'Declares a named region for template inheritance.'
    },
    {
        label: 'watch',
        insertText: 'watch ${1:state_key}',
        description: 'Reactive region re-rendered by the live server when the state key changes.'
    },
    {
        label: 'css',
        insertText: 'css ${1:static/css/style.css}',
        description: 'Injects a CSS file inline as a `<style>` tag.'
    },
    {
        label: 'js',
        insertText: 'js ${1:static/js/app.js}',
        description: 'Injects a JS file inline as a `<script>` tag.'
    }
];

export const BUILTIN_MACROS: KeywordInfo[] = [
    {
        label: 'list',
        insertText: 'list(${1:items} class="${2:list}")',
        description: 'Renders an array as `<ul>`/`<li>`.\n\nWith a second array, renders checkboxes with those values checked.'
    },
    {
        label: 'table',
        insertText: 'table(${1:heads} ${2:rows} ${3:footers} class="${4:table}")',
        description: 'Renders a full HTML table from the headers, rows and footers arrays, in that order.'
    }
];

export const CONTROL_FLOW: KeywordInfo[] = [
    {
        label: '<if>',
        insertText: '<if ${1:condition}>\n\t$0\n<endif>',
        description: 'Conditional block.'
    },
    {
        label: '<elif>',
        insertText: '<elif ${1:condition}>',
        description: 'Alternative branch of a conditional block.'
    },
    { label: '<else>', insertText: '<else>', description: 'Fallback branch of a conditional block.' },
    { label: '<endif>', insertText: '<endif>', description: 'Closes a conditional block.' },
    {
        label: '<for>',
        insertText: '<for ${1:item} in ${2:collection}>\n\t$0\n<endfor>',
        description: 'Loop block. Access the current item with `#item`.'
    },
    { label: '<endfor>', insertText: '<endfor>', description: 'Closes a loop block.' }
];
