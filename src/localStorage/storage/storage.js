import localforage from "localforage";

class Storage {
  constructor() {
    localforage.config({
      name: "PietaCRM"
    });
  }

  async setItem(key, value) {
    return await localforage.setItem(key, value);
  }

  async getItem(key) {
    return await localforage.getItem(key);
  }

  async removeItem(key) {
    return await localforage.removeItem(key);
  }
}

export default new Storage();
