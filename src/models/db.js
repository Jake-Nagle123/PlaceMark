import { userMemStore } from "./mem/user-mem-store.js";
import { stadiumMemStore } from "./mem/stadium-mem-store.js";

export const db = {
  userStore: null,
  stadiumStore: null,

  init() {
    this.userStore = userMemStore;
    this.stadiumStore = stadiumMemStore;
  },
};