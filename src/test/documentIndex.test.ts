import assert from 'node:assert/strict';
import { test } from 'node:test';
import { indexDocument, loopVariableMembers, loopVariablesInScope } from '../documentIndex';

const TEMPLATE = [
    'include inc/card.suc',
    'include inc/button',
    '',
    'block content',
    '    watch products',
    '        h1 {title | upper}',
    '        h2 {subtitle | shout | reverse}',
    '        <for product in products>',
    '            <for tag in product.tags>',
    '                span #tag.label',
    '            <endfor>',
    '            span #product.name',
    '        <endfor>',
    '        p Done'
].join('\n');

test('collects macros from include statements, with or without the extension', () => {
    assert.deepEqual(indexDocument(TEMPLATE).macros, ['card', 'button']);
});

test('collects block and watch names', () => {
    const index = indexDocument(TEMPLATE);
    assert.deepEqual(index.blocks, ['content']);
    assert.deepEqual(index.watches, ['products']);
});

test('collects interpolated variables and custom filters', () => {
    const index = indexDocument(TEMPLATE);
    assert.deepEqual(index.variables, ['title', 'subtitle']);
    assert.deepEqual(index.filters, ['upper', 'shout', 'reverse']);
});

test('reports enclosing loop variables innermost first', () => {
    const lines = TEMPLATE.split('\n');
    assert.deepEqual(loopVariablesInScope(lines, 9), ['tag', 'product']);
});

test('ignores loops already closed above the cursor', () => {
    const lines = TEMPLATE.split('\n');
    assert.deepEqual(loopVariablesInScope(lines, 11), ['product']);
    assert.deepEqual(loopVariablesInScope(lines, 13), []);
});

test('collects the members used on a loop variable', () => {
    assert.deepEqual(loopVariableMembers(TEMPLATE, 'product'), ['name', 'tags']);
    assert.deepEqual(loopVariableMembers(TEMPLATE, 'tag'), ['label']);
});

test('collects loop variable members written as interpolations', () => {
    const template = '<for p in products>\n    span {p.price}\n<endfor>';
    assert.deepEqual(loopVariableMembers(template, 'p'), ['price']);
});
