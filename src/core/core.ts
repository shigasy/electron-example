const { BrowserWindow, dialog } = require('electron').remote;

// import os from 'os';
// import path from 'path';

// const dataFilePath = path.join(os.homedir(), '/electron/todo.json');

const saveText = (): any => {
  const win = BrowserWindow.getFocusedWindow();
  console.log(win);
};

const core = {
  saveText,
};

export default core;
