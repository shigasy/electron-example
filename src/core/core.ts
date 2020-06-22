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
      if (error) {
        alert('save error');
      }
    });
  }
  console.log(res.filePath);
};

const readFile = (path: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, { encoding: 'utf8' }, (err, data) => {
      if (err) {
        // rejectを返したら処理が中断される
        reject(err);
      }
      resolve(data);
    });
  });
};

const openFile = async (): Promise<string | null> => {
  const win = BrowserWindow.getFocusedWindow();
  if (win === null) {
    alert('open error');
    return null;
  }

  const res = await dialog.showOpenDialog(win, {
    properties: ['openFile'],
    filters: [
      {
        name: 'Document',
        extensions: ['txt'],
      },
    ],
  });

  // 同期はNode全体が止まるから速度を求めるアプリだと嫌われる
  // / readFileSyncも同期だけど、awaitと違いあるか分からん
  if (res.filePaths.length) {
    // reject返ってきたらcatchの処理に行く
    const fileBody = await readFile(res.filePaths[0]).catch((err) => {
      alert('file open error');
      console.log(err);
      return null;
    });
    return fileBody;
  }
  return null;
};

const core = {
  saveText,
  openFile,
};

export default core;
