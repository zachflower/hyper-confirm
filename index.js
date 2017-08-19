const { dialog } = require('electron');

let confirmQuit = false;

exports.decorateConfig = (config) => {
  if (config.confirmQuit) {
    confirmQuit = !!config.confirmQuit;
  }

  return config;
};

exports.onApp = (app) => {
  let quitConfirmed = false;

  app.on('before-quit', (event) => {
    if (!!confirmQuit && !quitConfirmed && app.getWindows().size ) {
      event.preventDefault();

      dialog.showMessageBox({
        type: 'question',
        buttons: ['OK', 'Cancel'],
        defaultId: 0,
        title: 'Quit Hyper?',
        message: 'Quit Hyper?',
        detail: 'All sessions will be closed.'
      }, (index) => {
        if (index === 0) {
          quitConfirmed = true;
          app.quit();
        }
      });
    }
  });
}
