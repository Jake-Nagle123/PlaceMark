import { userMemStore } from "./mem/user-mem-store.js";
import { eventMemStore } from "./mem/event-mem-store.js";

export const db = {
  userStore: null,
  eventStore: null,

  init() {
    this.userStore = userMemStore;
    this.eventStore = eventMemStore;
  },
};