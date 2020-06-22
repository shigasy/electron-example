import fs from 'fs';

const { BrowserWindow, dialog } = require('electron').remote;

// import os from 'os';
// import path from 'path';

// const dataFilePath = path.join(os.homedir(), '/electron/todo.json');

const saveText = async (body: string): Promise<void> => {
  const win = BrowserWindow.getFocusedWindow();
  if (win === null) {
    alert('save error');
    return;
  }
  const res = await dialog.showSaveDialog(win, {
    title: 'text',
    message: 'message',
    filters: [
      {
        name: 'Document',
        extensions: ['txt'],
      },
    ],
  });
  if (res.filePath) {
    fs.writeFile(res.filePath, body, (error: any) => {
      if (error != null) {
        alert('save error');
      }
    });
  }
  console.log(res.filePath);
};

const core = {
  saveText,
};

export default core;
