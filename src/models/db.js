import { userMemStore } from "./mem/user-mem-store.js";
import { eventMemStore } from "./mem/event-mem-store.js";
import { stadiumMemStore } from "./mem/stadium-mem-store.js";
import { userJsonStore } from "./json/user-json-store.js";
import { eventJsonStore } from "./json/event-json-store.js";
import { stadiumJsonStore } from "./json/stadium-json-store.js";
import { connectMongo } from "./mongo/connect.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";

export const db = {
  userStore: null,
  eventStore: null,
  stadiumStore: null,

  init(storeType) {
    switch (storeType) {
      case "json":
        this.userStore = userJsonStore;
        this.eventStore = eventJsonStore;
        this.stadiumStore = stadiumJsonStore;
        break;
      case "mongo":
        this.userStore = userMongoStore;
        connectMongo();
        break;      
      default:
        this.userStore = userMemStore;
        this.eventStore = eventMemStore;
        this.stadiumStore = stadiumMemStore;
    }
  },
};