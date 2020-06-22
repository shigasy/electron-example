/* eslint-disable @typescript-eslint/no-var-requires */
import { app, BrowserWindow, globalShortcut } from 'electron';
import path from 'path';
import url from 'url';

// eslint-disable-next-line import/no-extraneous-dependencies
import hotReload from 'electron-reloader';

hotReload(module);
// セキュアな Electron の構成
// 参考: https://qiita.com/pochman/items/64b34e9827866664d436

const createWindow = () => {
  // レンダープロセスとなる、ウィンドウオブジェクトを作成する。
  const win = new BrowserWindow({
    width: 1200,
    height: 600,
    webPreferences: {
      // レンダラープロセスで Node.js 使えないようにする (XSS対策)
      nodeIntegration: false,
      nodeIntegrationInWorker: false,
      // preload で実行するときに、コンテキスト(this == window)を別なものとする
      contextIsolation: true,
      // process や Electron を windowオブジェクト に保存する処理。フルパスの指定が必要
      preload: path.join(__dirname, './core/preLoad.js'), // preLoad.js にビジネスロジックを記述する
    },
  });
  // 読み込む index.html。
  // tsc でコンパイルするので、出力先の dist の相対パスで指定する。
  win.loadFile('./index.html');

  // 開発者ツールを起動する
  win.webContents.openDevTools();
  return win;
};

let isOpen = true;

const closeMainWindow = () => {
  isOpen = false;
};

const createMainWindow = () => {
  const main = new BrowserWindow({
    width: 600,
    height: 500,
    frame: false, // 枠の無いウィンドウ
    resizable: false, // ウィンドウのリサイズを禁止
    show: false,
    alwaysOnTop: true,
    hasShadow: false,
    webPreferences: {
      // レンダラープロセスで Node.js 使えないようにする (XSS対策)
      nodeIntegration: false,
      nodeIntegrationInWorker: false,
      // preload で実行するときに、コンテキスト(this == window)を別なものとする
      contextIsolation: true,
      // process や Electron を windowオブジェクト に保存する処理。フルパスの指定が必要
      preload: path.join(__dirname, './core/preLoad.js'), // preLoad.js にビジネスロジックを記述する
    },
  });
  main.setVisibleOnAllWorkspaces(true);

  main.setAlwaysOnTop(true, 'screen-saver', 1);
  main.on('closed', closeMainWindow);

  // main.setVisibleOnAllWorkspaces(true);
  main.loadURL(
    url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file',
      slashes: true,
      hash: 'main',
    })
  );
  return main;
};

// --------------

const openMainWindow = () => {
  closeMainWindow();
  createMainWindow();
  isOpen = true;
};

const isMainWindowOpen = () => isOpen;

// Electronの起動準備が終わったら、ウィンドウを作成する。
app.whenReady().then(() => {
  const main = createMainWindow();

  if (!main.isVisible()) {
    app.dock.hide();
    main.showInactive();

    // And also hide it after a while
    setTimeout(() => {
      main.hide();
      app.dock.show();
    }, 1000);
  }

  // const win = createWindow();
  // app.dock.hide();

  // const main = createMainWindow();
  const ret = globalShortcut.register('CommandOrControl+X', () => {
    console.log('CommandOrControl+X is pressed');
    if (isOpen) {
      main.hide();
      app.dock.show();
    } else {
      app.dock.hide();
      main.showInactive();
    }
    isOpen = !isOpen;

    // if (isMainWindowOpen()) {
    //   closeMainWindow();
    //   // hides the dock icon for our app which allows our windows to join other
    //   // apps' spaces. without this our windows open on the nearest "desktop" space
    //   // main.setAlwaysOnTop(true, 'floating');
    //   // main.setVisibleOnAllWorkspaces(true);
    //   // main.setFullScreenable(false);

    //   // app.dock.show();
    //   console.log('close');
    // } else {
    //   app.dock.show();

    //   openMainWindow();
    // }
  });

  if (!ret) {
    console.log('registration failed');
  }

  // Check whether a shortcut is registered.
  console.log(globalShortcut.isRegistered('CommandOrControl+X'));
});

app.on('before-quit', closeMainWindow);

// すべての ウィンドウ が閉じたときの処理
app.on('window-all-closed', () => {
  globalShortcut.unregisterAll();

  // macOS 以外では、メインプロセスを停止する
  // macOS では、ウインドウが閉じてもメインプロセスは停止せず
  // ドックから再度ウインドウが表示されるようにする。
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // macOS では、ウインドウが閉じてもメインプロセスは停止せず
  // ドックから再度ウインドウが表示されるようにする。
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
