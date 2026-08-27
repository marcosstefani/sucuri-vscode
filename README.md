# Sucuri for VS Code

Welcome to the official **[Sucuri](https://github.com/marcosstefani/sucuri)** language support extension for Visual Studio Code!

<p align="center">
    <img src="https://user-images.githubusercontent.com/16294901/37826760-892cd0de-2e73-11e8-8ea1-2afc390c2ac0.png" width="150" alt="Sucuri">
</p>

Sucuri is a simple and efficient template engine for Python projects, featuring a clean and minimalist syntax inspired by PugJS.

## Features

This extension provides the following features when editing `.suc` files:

- **Syntax Highlighting** covering the full Sucuri language:
    - Tags, CSS shortcuts (`.class`, `#id`, `section#main.active`) and implicit `div` lines.
    - Attributes inside `()`, including boolean attributes (`checked`) and interpolation inside attribute values (`href="{url}"`, `class="is-#item.status"`).
    - Interpolated variables (`{variable}`, `{user.name}`) and loop variables (`#item`, `#item.name`).
    - Filters (`{title | upper}`, `#item.name | title`), with built-ins (`upper`, `lower`, `title`, `safe`) distinguished from custom ones.
    - Control flow: `<if>`, `<elif>`, `<else>`, `<endif>`, `<for … in …>`, `<endfor>` — conditions are tokenized (operators, numbers, strings, `True`/`False`/`None`, `and`/`or`/`not`/`in`).
    - Directives: `include`, `extends`, `block`, `watch`, and the asset injectors `css` / `js`.
    - Macro calls (`+card`) with inline parameters (`+card(title="Warning")`).
    - Built-in macros `list(...)` and `table(...)`, with their positional arguments highlighted as context variables.
    - Multi-line text with the pipe (`|`) character and HTML entities (`&amp;`, `&#60;`).
- **Common Error Validation**:
    - Commas `,` inside attribute parentheses are marked as invalid (illegal in Sucuri).
    - `style path.css` / `script path.js` are marked as deprecated — Sucuri uses `css` and `js` for asset injection; `style` and `script` are plain HTML tags.
- **Editing Support**: off-side folding (indentation based), automatic indentation after blocks and childless tags, bracket matching and auto-closing pairs.

> **Note:** Sucuri has no comment syntax, so `Toggle Comment` is intentionally disabled for `.suc` files.

## IntelliSense

Completions are context aware — what you get depends on where the cursor is on the line:

| Where you type | What you get |
| --- | --- |
| Start of a line | HTML tags, directives (`include`, `extends`, `block`, `watch`, `css`, `js`), `<if>`/`<for>` blocks, `list()`/`table()` and the macros already included |
| `a(` | Attributes for that tag (`href`, `target`, `rel`, …) followed by the global ones. Boolean attributes such as `checked` are inserted without a value |
| `input(type="` | The allowed values for that attribute (`text`, `checkbox`, `submit`, …) |
| `{` | Loop variables in scope, plus the context variables already used in the file |
| `{title \| ` or `#item.name \| ` | Built-in filters (`upper`, `lower`, `title`, `safe`) and custom filters used in the file |
| `#` | Loop variables of the enclosing `<for>` blocks; after `#item.`, the members already used on that variable |
| `+` | Macros declared with `include` in the current file |
| `<` | `<if>`, `<elif>`, `<else>`, `<endif>`, `<for>`, `<endfor>` |
| `include `, `extends `, `css `, `js ` | Workspace files, relative to the current template — the same base directory Sucuri uses to resolve them |

## Snippets

| Prefix | Description |
| --- | --- |
| `if`, `ife`, `elif`, `else` | Conditional blocks |
| `for` | Loop block (`<for>` / `<endfor>`) |
| `include` | Import an external template |
| `inject`, `injectp` | Inject a macro, with or without inline parameters |
| `extends`, `block` | Template inheritance |
| `watch` | Reactive block for the live server |
| `css`, `js` | Inject a CSS/JS file |
| `list`, `listck`, `table` | Built-in list, checkbox list and table macros |
| `var`, `filter` | Variable interpolation, with or without a filter |
| `code` | Literal multi-line code block (`pre` + `code` + `\|`) |
| `html5` | Basic document skeleton |
| `\|` | Multi-line text line |

## Usage

To compile/render the edited code, remember that you need the Python interpreter:

```bash
# Installing the Sucuri interpreter
pip install sucuri

# Compilation example using the CLI
sucuri build source.suc -o rendered_template.html
```

## Contributing

Issues or suggestions regarding the base language and/or the extension:
- Issue Tracker: [https://github.com/marcosstefani/sucuri/issues](https://github.com/marcosstefani/sucuri/issues)
- Base Repository: [https://github.com/marcosstefani/sucuri](https://github.com/marcosstefani/sucuri)

### Local development

```bash
npm install
npm run watch     # incremental TypeScript build
npm test          # grammar tests + unit tests
```

Press `F5` to launch a VS Code window with the extension loaded.

## License

Distributed under the BSD License. (C) 2018 Marcos Stefani Rosa.
