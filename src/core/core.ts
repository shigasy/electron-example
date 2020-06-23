import fs from 'fs';
import robot from 'robotjs';

console.log(robot);
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

// 読み込まなかった場合と空文字を判定するためにnullにした
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

const initialOpenFile = async (path: string): Promise<string | null> => {
  const fileBody = await readFile(path).catch((err) => {
    alert('file open error');
    console.log(err);
    return null;
  });
  return fileBody;
};

const sendKeyTest = (): void => {
  // robot.typeString('Hello World');
  // robot.keyTap('enter');
  const win = BrowserWindow.getFocusedWindow();
  if (win) {
    win.hide();
  }

  robot.keyTap('space', ['command']);

  // console.log(robot.keyTap('space', ['command']));
};

const sendSineWave = (): void => {
  // Speed up the mouse.
  // robot.setMouseDelay(2);
  // const twoPI = Math.PI * 2.0;
  // const screenSize = robot.getScreenSize();
  // const height = screenSize.height / 2 - 10;
  // const { width } = screenSize;
  // for (let x = 0; x < width; x + 1) {
  //   const y = height * Math.sin((twoPI * x) / width) + height;
  //   robot.moveMouse(x, y);
  // }
};

const core = {
  saveText,
  openFile,
  initialOpenFile,
  sendKeyTest,
  sendSineWave,
};

export default core;
