export let globalData = [];
export const setGlobalData = (newData) => {
  globalData = newData;
};

// 방법 2: 클래스 사용
export class DataManager {
  static data = [];
  
  static setData(newData) {
    this.data = newData;
  }
  
  static getData() {
    return this.data;
  }
}