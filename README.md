# hyper-confirm

`hyper-confirm` is a plugin for [Hyper](https://hyper.is/) (formerly HyperTerm) that shows a confirmation dialog before quitting Hyper. This functionality, which is found in other terminal emulators like [iTerm2](https://www.iterm2.com/), provides a safety net against accidentally quitting Hyper (a common problem outlined in Hyper Issue #399).

## Installation & Configuration

1. Open your Hyper config file (typically `~/.hyper.js`) in your preferred text editor.
2. Add `hyper-confirm` to the `plugins` array:
  ```javascript
    plugins: [
      ...
      'hyper-confirm'
    ]
  ```
3. Add `confirmQuit: true` to the `config` object.
  ```javascript
    module.exports = {
      config: {
        ...
        confirmQuit: true
      },
      ...
    };
  ```

## License

`hyper-confirm` is released under the [MIT License](LICENSE.md).
