# Change Log

All notable changes to the "sucuri" extension will be documented in this file.

## [1.1.0] - 2026-08-27
### Added
- Highlighting for the `css` and `js` asset directives.
- Tokenization of `<if>` / `<elif>` conditions: comparison and logical operators, numbers, strings and `True`/`False`/`None`.
- Highlighting for the built-in `list()` and `table()` macros, with positional arguments treated as context variables.
- Variable and loop-variable interpolation inside quoted attribute values (`href="{url}"`, `class="is-#item.status"`).
- Distinct scopes for built-in filters (`upper`, `lower`, `title`, `safe`) and custom filters.
- Separate scopes for `id` and `class` in CSS shortcuts (`section#main.active`), plus support for implicit `div` lines (`#app.wrapper`).
- Highlighting for HTML entities and for boolean attributes (`input(type="checkbox" checked)`).
- Off-side (indentation based) folding and automatic indentation after blocks, childless tags and macros.
- Editor defaults for `.suc` files (spaces instead of tabs, tab size 4).
- New snippets: `css`, `js`, `listck`, `var`, `filter`, `code` and `html5`.

### Changed
- Snippet descriptions translated to English.
- `list` and `table` snippets now produce valid argument lists.

### Fixed
- `style` / `script` were highlighted as asset directives; the actual directives are `css` and `js`. The old form is now flagged as deprecated.
- Attribute values are no longer mis-tokenized when they contain parentheses or interpolation.

### Removed
- `//` and `/* */` comment configuration: Sucuri has no comment syntax and those lines are a parser error.

## [0.0.1] - 2026-05-17
### Added
- Initial support for the Sucuri language (`.suc` extension).
- syntax highlighting rules inspired by PugJS design.
- Special highlight for conditionals `<if...>`, loops `<for...>`, and injections markers (`+` and `|`).
- Code snippets (`for`, `if`, `include` and `inject`).
- Validation and error marking for commas inside parallel attributes definitions.
- Bracket matching, auto closing pairs, and comments (`/* */` and `//`) configuration.