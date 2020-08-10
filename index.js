const {dialog} = require('electron');

let confirmQuit = true;
let beforeQuitHandler;

const createBeforeQuitHandler = app => {
  let quitConfirmed = false;
  return event => {
    if (confirmQuit && !quitConfirmed && app.getWindows().size) {
      event.preventDefault();
      dialog.showMessageBox({
        type: 'question',
        buttons: ['OK', 'Cancel'],
        defaultId: 0,
        title: 'Quit Hyper?',
        message: 'Quit Hyper?',
        detail: 'All sessions will be closed.'
      }, index => {
        if (index === 0) {
          quitConfirmed = true;
          app.quit();
        }
      });
    }
  };
};

exports.decorateConfig = config => {
  if (typeof config.confirmQuit !== undefined) {
    confirmQuit = Boolean(config.confirmQuit);
  }

  return config;
};

exports.onApp = app => {
  switch (process.platform) {
    case 'win32':
      // Windows confirmations happen in the middleware
      break;
    default:
      if (beforeQuitHandler) {
        app.off('before-quit', beforeQuitHandler);
      }

      beforeQuitHandler = createBeforeQuitHandler(app);
      app.on('before-quit', beforeQuitHandler);

      break;
  }
};

exports.middleware = _ => next => action => {
  const {dialog, app} = require('electron').remote;

  let confirmQuit = true;

  if (typeof app.config.getConfig().confirmQuit !== undefined) {
    confirmQuit = Boolean(app.config.getConfig().confirmQuit);
  }

  switch (process.platform) {
    case 'win32':
      if (confirmQuit && action.type === 'UI_WINDOW_CLOSE') {
        dialog.showMessageBox({
          type: 'question',
          buttons: ['OK', 'Cancel'],
          defaultId: 0,
          title: 'Quit Hyper?',
          message: 'Quit Hyper?',
          detail: 'All sessions will be closed.'
        }, index => {
          if (index === 0) {
            next(action);
          }
        });

        return;
      }

      break;
    default:
      // No special middleware for non-windows operating systems
      break;
  }

  next(action);
};
