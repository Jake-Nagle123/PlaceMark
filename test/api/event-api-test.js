import { EventEmitter } from "events";
import { assert } from "chai";
import { eventService } from "./event-service.js";
import { assertSubset } from "../test-utils.js";
import { kevin, trip, testEvents } from "../fixtures.js";

EventEmitter.setMaxListeners(25);

suite("Event API tests", () => {
  let user = null;

  setup(async () => {
    eventService.clearAuth();
    user = await eventService.createUser(kevin);
    await eventService.authenticate(kevin);
    await eventService.deleteAllEvents();
    await eventService.deleteAllUsers();
    user = await eventService.createUser(kevin);
    await eventService.authenticate(kevin);
    trip.userid = user._id;
  });

  teardown(async () => {});

  test("create event", async () => {
    const returnedEvent = await eventService.createEvent(trip);
    assert.isNotNull(returnedEvent);
    assertSubset(trip, returnedEvent);
  });

  test("delete an event", async () => {
    const event = await eventService.createEvent(trip);
    const response = await eventService.deleteEvent(event._id);
    assert.equal(response.status, 204);
    try {
      const returnedEvent = await eventService.getEvent(event.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No event with this id", "Incorrect Response Message");
    }
  });

  test("create multiple events", async () => {
    for (let i = 0; i < testEvents.length; i += 1) {
      testEvents[i].userid = user._id;
      // eslint-disable-next-line no-await-in-loop
      await eventService.createEvent(testEvents[i]);
    }
    let returnedLists = await eventService.getAllEvents();
    assert.equal(returnedLists.length, testEvents.length);
    await eventService.deleteAllEvents();
    returnedLists = await eventService.getAllEvents();
    assert.equal(returnedLists.length, 0);
  });

  test("remove non-existant event", async () => {
    try {
      const response = await eventService.deleteEvent("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Event with this id", "Incorrect Response Message");
    }
  });
});