# Sucuri for VS Code

Welcome to the official **[Sucuri](https://github.com/marcosstefani/sucuri)** language support extension for Visual Studio Code!

<p align="center">
    <img src="https://user-images.githubusercontent.com/16294901/37826760-892cd0de-2e73-11e8-8ea1-2afc390c2ac0.png" width="150" alt="Sucuri">
</p>

Sucuri is a simple and efficient template engine for Python projects, featuring a clean and minimalist syntax inspired by PugJS.

## Features

This extension provides the following features when editing `.suc` files:

- **Syntax Highlighting**: Accurate coloring for PugJS-inspired syntax, highlighting Entity tags, injected variables (`{variable}`, `#loop_var`), and language-specific markup flow (`<if>`, `<for>`).
- **Common Error Validation**: Clearly marks invalid commas `,` inside attribute parenthesis (which is illegal according to the language specification).
- **Built-in Snippets**:
    - Type `for` to insert `<for ...>` and `<endfor>`.
    - Type `if` to insert `<if ...>` and `<endif>`.
    - Type `include` to create an import template reference.
    - Type `inject` or `+` to use the imported component.
- **Formatting and Auto-closing**: Support for automatic closing of brackets, brackets, quotes, and comments `/* */` and `//`.

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

## License

Distributed under the BSD License. (C) 2018 Marcos Stefani Rosa.
