import assert from 'node:assert/strict';
import { test } from 'node:test';
import { analyzeLine } from '../lineContext';

test('suggests attributes right after the opening parenthesis', () => {
    assert.deepEqual(analyzeLine('        a('), { kind: 'attributeName', tag: 'a', builtinMacro: false });
});

test('keeps the attribute context after a closed attribute value', () => {
    assert.deepEqual(analyzeLine('        a(href="/" '), { kind: 'attributeName', tag: 'a', builtinMacro: false });
});

test('resolves the tag through CSS shortcuts', () => {
    assert.deepEqual(analyzeLine('    div.card#main('), { kind: 'attributeName', tag: 'div', builtinMacro: false });
});

test('flags list and table as built-in macros', () => {
    assert.deepEqual(analyzeLine('        list('), { kind: 'attributeName', tag: 'list', builtinMacro: true });
    assert.deepEqual(analyzeLine('        table('), { kind: 'attributeName', tag: 'table', builtinMacro: true });
});

test('does not offer HTML attributes for macro parameters', () => {
    assert.equal(analyzeLine('        +card('), undefined);
});

test('suggests values inside a quoted attribute', () => {
    assert.deepEqual(analyzeLine('        input(type="'), {
        kind: 'attributeValue',
        tag: 'input',
        attribute: 'type'
    });
    assert.deepEqual(analyzeLine("        a(target='_"), {
        kind: 'attributeValue',
        tag: 'a',
        attribute: 'target'
    });
});

test('suggests variables interpolated inside an attribute value', () => {
    assert.deepEqual(analyzeLine('        a(href="{u'), { kind: 'interpolation', word: 'u' });
});

test('suggests variables inside an interpolation', () => {
    assert.deepEqual(analyzeLine('        h1 Hello {'), { kind: 'interpolation', word: '' });
    assert.deepEqual(analyzeLine('        h1 Hello {user.na'), { kind: 'interpolation', word: 'user.na' });
});

test('suggests filters after a pipe inside an interpolation', () => {
    assert.deepEqual(analyzeLine('        h1 {title | '), { kind: 'filter' });
});

test('suggests filters after a pipe on a loop variable', () => {
    assert.deepEqual(analyzeLine('            li #item.name | '), { kind: 'filter' });
});

test('suggests loop variables and their members after a hash', () => {
    assert.deepEqual(analyzeLine('            li Value #'), { kind: 'loopVariable', word: '' });
    assert.deepEqual(analyzeLine('            li Value #item.'), { kind: 'loopVariable', word: 'item.' });
});

test('suggests paths for the import and asset directives', () => {
    assert.deepEqual(analyzeLine('include '), { kind: 'path', directive: 'include', typed: '' });
    assert.deepEqual(analyzeLine('extends lay'), { kind: 'path', directive: 'extends', typed: 'lay' });
    assert.deepEqual(analyzeLine('css static/'), { kind: 'path', directive: 'css', typed: 'static/' });
    assert.deepEqual(analyzeLine('js static/js/a'), { kind: 'path', directive: 'js', typed: 'static/js/a' });
});

test('suggests included macros after a plus sign', () => {
    assert.deepEqual(analyzeLine('        +'), { kind: 'macro', word: '' });
    assert.deepEqual(analyzeLine('        +ca'), { kind: 'macro', word: 'ca' });
});

test('suggests control flow blocks after an angle bracket', () => {
    assert.deepEqual(analyzeLine('        <'), { kind: 'controlFlow' });
    assert.deepEqual(analyzeLine('        <fo'), { kind: 'controlFlow' });
});

test('suggests tags and directives at the start of a line', () => {
    assert.deepEqual(analyzeLine('    '), { kind: 'lineStart', word: '' });
    assert.deepEqual(analyzeLine('    di'), { kind: 'lineStart', word: 'di' });
});

test('stays silent in free text and in already closed constructs', () => {
    assert.equal(analyzeLine('        h1 Hello world'), undefined);
    assert.equal(analyzeLine("        a(href='#') Google"), undefined);
    assert.equal(analyzeLine('        <if user.role == "'), undefined);
    assert.equal(analyzeLine('        <for item in '), undefined);
});
