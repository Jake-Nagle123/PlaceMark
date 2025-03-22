import { assert } from "chai";
import { db } from "../src/models/db.js";
import { testEvents, testStadiums, game, trip, gameday, testUsers } from "./fixtures.js";
import { assertSubset } from "./test-utils.js";

suite("Stadium Model tests", () => {

  let gameList = null;

  setup(async () => {
    db.init("mongo");
    await db.eventStore.deleteAllEvents();
    await db.stadiumStore.deleteAllStadiums();
    gameList = await db.eventStore.addEvent(game);
    for (let i = 0; i < testStadiums.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testStadiums[i] = await db.stadiumStore.addStadium(gameList._id, testStadiums[i]);
    }
  });

  test("create single stadium", async () => {
    const tripList = await db.eventStore.addEvent(trip);
    const stadium = await db.stadiumStore.addStadium(tripList._id, gameday)
    assert.isNotNull(stadium._id);
    assertSubset(gameday, stadium);
  });

  test("get multiple stadiums", async () => {
    const stadiums = await db.stadiumStore.getStadiumsByEventId(gameList._id);
    assert.equal(stadiums.length, testStadiums.length)
  });

  test("delete all stadiums", async () => {
    const stadiums = await db.stadiumStore.getAllStadiums();
    assert.equal(testStadiums.length, stadiums.length);
    await db.stadiumStore.deleteAllStadiums();
    const newStadiums = await db.stadiumStore.getAllStadiums();
    assert.equal(0, newStadiums.length);
  });

  test("get a stadium - success", async () => {
    const tripList = await db.eventStore.addEvent(trip);
    const stadium = await db.stadiumStore.addStadium(tripList._id, gameday)
    const newStadium = await db.stadiumStore.getStadiumById(stadium._id);
    assertSubset(gameday, newStadium);
  });

  test("delete One Stadium - success", async () => {
    await db.stadiumStore.deleteStadium(testStadiums[0]._id);
    const stadiums = await db.stadiumStore.getAllStadiums();
    assert.equal(stadiums.length, testEvents.length - 1);
    const deletedStadium = await db.stadiumStore.getStadiumById(testStadiums[0]._id);
    assert.isNull(deletedStadium);
  });

  test("get a stadium - bad params", async () => {
    assert.isNull(await db.stadiumStore.getStadiumById(""));
    assert.isNull(await db.stadiumStore.getStadiumById());
  });

  test("delete one stadium - fail", async () => {
    await db.stadiumStore.deleteStadium("bad-id");
    const stadiums = await db.stadiumStore.getAllStadiums();
    assert.equal(stadiums.length, testEvents.length);
  });
});