import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { eventService } from "./event-service.js";
import { kevin, kevinCredentials, trip, testEvents, testStadiums, gameday } from "../fixtures.js";

suite("Stadium API tests", () => {
  let user = null;
  let weekOne = null;

  setup(async () => {
    eventService.clearAuth();
    user = await eventService.createUser(kevin);
    await eventService.authenticate(kevinCredentials);
    await eventService.deleteAllEvents();
    await eventService.deleteAllStadiums();
    await eventService.deleteAllUsers();    
    user = await eventService.createUser(kevin);
    await eventService.authenticate(kevinCredentials);
    trip.userid = user._id;
    weekOne = await eventService.createEvent(trip);
  });

  teardown(async () => {});

  test("create stadium", async () => {
    const returnedStadium = await eventService.createStadium(weekOne._id, gameday);
    assertSubset(gameday, returnedStadium);
  });

  test("create Multiple stadiums", async () => {
    for (let i = 0; i < testStadiums.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await eventService.createStadium(weekOne._id, testStadiums[i]);
    }
    const returnedStadiums = await eventService.getAllStadiums();
    assert.equal(returnedStadiums.length, testStadiums.length);
    for (let i = 0; i < returnedStadiums.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const stadium = await eventService.getStadium(returnedStadiums[i]._id);
      assertSubset(stadium, returnedStadiums[i]);
    }
  });

  test("Delete StadiumApi", async () => {
    for (let i = 0; i < testStadiums.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await eventService.createStadium(weekOne._id, testStadiums[i]);
    }
    let returnedStadiums = await eventService.getAllStadiums();
    assert.equal(returnedStadiums.length, testStadiums.length);
    for (let i = 0; i < returnedStadiums.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const stadium = await eventService.deleteStadium(returnedStadiums[i]._id);
    }
    returnedStadiums = await eventService.getAllStadiums();
    assert.equal(returnedStadiums.length, 0);
  });

  test("denormalised stadium", async () => {
    for (let i = 0; i < testStadiums.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await eventService.createStadium(weekOne._id, testStadiums[i]);
    }
    const returnedStadium = await eventService.getEvent(weekOne._id);
    assert.equal(returnedStadium.stadiums.length, testStadiums.length);
    for (let i = 0; i < testStadiums.length; i += 1) {
      assertSubset(testStadiums[i], returnedStadium.stadiums[i]);
    }
  });
});