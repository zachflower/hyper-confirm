![build](https://github.com/zachflower/hyper-confirm/workflows/Node.js%20CI/badge.svg) [![npm](https://img.shields.io/npm/v/hyper-confirm.svg)](https://www.npmjs.com/package/hyper-confirm) [![npm](https://img.shields.io/npm/dt/hyper-confirm.svg)](https://www.npmjs.com/package/hyper-confirm) [![npm](https://img.shields.io/npm/l/hyper-confirm.svg)](https://www.npmjs.com/package/hyper-confirm)

# hyper-confirm

`hyper-confirm` is a plugin for [Hyper](https://hyper.is/) (formerly HyperTerm) that shows a confirmation dialog before quitting Hyper. This functionality, which is found in other terminal emulators like [iTerm2](https://www.iterm2.com/), provides a safety net against accidentally quitting Hyper (a common problem outlined in [Hyper Issue #399](https://github.com/zeit/hyper/issues/399)).

![](.github/demo.gif)

## Installation

### Via [hpm](https://github.com/zeit/hpm)

To install `hyper-confirm` via `hpm` (recommended), run the following command in your terminal:

```
hpm install hyper-confirm
```

### Manually

If you don't use `hpm`, add `hyper-confirm` to the `plugins` array in your Hyper config file (typically found at `~/.hyper.js`):

```javascript
  plugins: [
    ...
    'hyper-confirm'
  ]
```

## Configuration

As of `hyper-confirm` v1.0, the quit confirmation dialog is enabled by default. To disable it, add `confirmQuit: false` to the `config` object in your Hyper config file (typically found at `~/.hyper.js`):

```javascript
  module.exports = {
    config: {
      ...
      confirmQuit: false
    },
    ...
  };
```

## Credits

- [@albinekb](https://github.com/albinekb), who opened [this unmerged pull request](https://github.com/zeit/hyper/pull/403) that acted as the foundation for `hyper-confirm`


## License

`hyper-confirm` is released under the [MIT License](LICENSE.md).
