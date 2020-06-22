export default interface Core {
  saveText: () => any;
}

// windowオブジェクトにcoreの定義を追加する
declare global {
  interface Window {
    core: Core;
  }
}
