import { EventEmitter } from "events";
import { assert } from "chai";
import { eventService } from "./event-service.js";
import { assertSubset } from "../test-utils.js";
import { kevin, trip, testEvents } from "../fixtures";

EventEmitter.setMaxListeners(25);

suite("Event API tests", () => {

  let user = null;

  setup(async () => {
    await eventService.deleteAllEvents();
    await eventService.deleteAllUsers();
    user = await eventService.createUser(kevin);
    trip.userid = user._id;
  });

  teardown(async () => {});

  test("create event", async () => {
  });

  test("delete a event", async () => {
  });

  test("create multiple events", async () => {
  });

  test("remove non-existant event", async () => {
  });
});