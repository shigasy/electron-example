export default interface Core {
  saveText: (body: string) => Promise<void>;
}

// windowオブジェクトにcoreの定義を追加する
declare global {
  interface Window {
    core: Core;
  }
}
