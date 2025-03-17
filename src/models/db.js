import { userMemStore } from "./mem/user-mem-store.js";
import { eventMemStore } from "./mem/event-mem-store.js";
import { stadiumMemStore } from "./mem/stadium-mem-store.js";

export const db = {
  userStore: null,
  eventStore: null,
  stadiumStore: null,

  init() {
    this.userStore = userMemStore;
    this.eventStore = eventMemStore;
    this.stadiumStore = stadiumMemStore;
  },
};