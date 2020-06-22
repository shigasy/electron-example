import core from '../core/core';

// export default interface Core extends core {
//   saveText: (body: string) => Promise<void>;
// }

// windowオブジェクトにcoreの定義を追加する
declare global {
  interface Window {
    core: typeof core;
  }
}
