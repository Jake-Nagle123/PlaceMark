// import { userMemStore } from "./mem/user-mem-store.js";
// import { eventMemStore } from "./mem/event-mem-store.js";
// import { stadiumMemStore } from "./mem/stadium-mem-store.js";

import { userJsonStore } from "./json/user-json-store.js";
import { eventJsonStore } from "./json/event-json-store.js";
import { stadiumJsonStore } from "./json/stadium-json-store.js";

export const db = {
  userStore: null,
  eventStore: null,
  stadiumStore: null,

  init() {
    this.userStore = userJsonStore;
    this.eventStore = eventJsonStore;
    this.stadiumStore = stadiumJsonStore;
  },
};