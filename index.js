const { dialog } = require('electron');

let confirmQuit = false;
let beforeQuitHandler;

const createBeforeQuitHandler = (app) => {
  let quitConfirmed = false;
  return (event) => {
    if (confirmQuit && !quitConfirmed && app.getWindows().size ) {
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
  };
};

exports.decorateConfig = (config) => {
  if (config.confirmQuit) {
    confirmQuit = !!config.confirmQuit;
  }
  return config;
};

exports.onApp = (app) => {
  if (beforeQuitHandler) app.off('before-quit', beforeQuitHandler);
  beforeQuitHandler = createBeforeQuitHandler(app);
  app.on('before-quit', beforeQuitHandler);
}


exports.middleware = (store) => (next) => (action) => {
  switch ( action.type ) {
    case 'CLOSE_TAB':
      console.log("YOU SHALL NOT CLOSE!");
      break;
    case 'UI_COMMAND_EXEC':
      if ( 'pane.close' == action.command ) {
        console.log("YOU SHALL NOT CLOSE!");
      }

      next(action);
      break;
    default:
      console.log("AHHHHH!");
      console.log(action);
      next(action);
      break;
  }
};
