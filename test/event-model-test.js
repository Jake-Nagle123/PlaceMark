import { assert } from "chai";
import { db } from "../src/models/db.js";
import { testEvents, game } from "./fixtures.js";

suite("Event Model tests", () => {

  setup(async () => {
    db.init("json");
    await db.eventStore.deleteAllEvents();
    for (let i = 0; i < testEvents.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testEvents[i] = await db.eventStore.addEvent(testEvents[i]);
    }
  });

  test("create an event", async () => {
    const event = await db.eventStore.addEvent(game);
    assert.equal(game, event);
    assert.isDefined(event._id);
  });

  test("delete all events", async () => {
    let returnedEvents = await db.eventStore.getAllEvents();
    assert.equal(returnedEvents.length, 3);
    await db.eventStore.deleteAllEvents();
    returnedEvents = await db.eventStore.getAllEvents();
    assert.equal(returnedEvents.length, 0);
  });

  test("get an event - success", async () => {
    const event = await db.eventStore.addEvent(game);
    const returnedEvent = await db.eventStore.getEventById(event._id);
    assert.equal(game, event);
  });

  test("delete One Playist - success", async () => {
    const id = testEvents[0]._id;
    await db.eventStore.deleteEventById(id);
    const returnedEvent = await db.eventStore.getAllEvents();
    assert.equal(returnedEvents.length, testEvents.length - 1);
    const deletedEvent = await db.eventStore.getEventById(id);
    assert.isNull(deletedEvent);
  });

  test("get an event - bad params", async () => {
    assert.isNull(await db.eventStore.getEventById(""));
    assert.isNull(await db.eventStore.getEventById());
  });

  test("delete One Event - fail", async () => {
    await db.eventStore.deleteEventById("bad-id");
    const allEvents = await db.eventStore.getAllEvents();
    assert.equal(testEvents.length, allEvents.length);
  });
});