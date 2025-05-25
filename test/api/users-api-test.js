import { assert } from "chai";
import { eventService } from "./event-service.js";
import { assertSubset } from "../test-utils.js";
import { kevin, testUsers } from "../fixtures.js";
import { db } from "../../src/models/db.js";

const users = new Array(testUsers.length);

suite("User API tests", () => {
  setup(async () => {
    eventService.clearAuth();
    await eventService.createUser(kevin);
    await eventService.authenticate(kevin);
    await eventService.deleteAllUsers();
    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      users[0] = await eventService.createUser(testUsers[i]);
    }
    await eventService.createUser(kevin);
    await eventService.authenticate(kevin);
  });
  teardown(async () => {});

  test("create a user", async () => {
    const newUser = await eventService.createUser(kevin);
    assertSubset(kevin, newUser);
    assert.isDefined(newUser._id);
  });

  test("delete all users", async () => {
    let returnedUsers = await eventService.getAllUsers();
    assert.equal(returnedUsers.length, 4);
    await eventService.deleteAllUsers();
    await eventService.createUser(kevin);
    await eventService.authenticate(kevin);
    returnedUsers = await eventService.getAllUsers();
    assert.equal(returnedUsers.length, 1);  
  });

  test("get a user - success", async () => {
    const returnedUser = await eventService.getUser(users[0]._id);
    assert.deepEqual(users[0], returnedUser);
  });

  test("get a user - bad id", async () => {
    try {
      const returnedUser = await eventService.getUser("1234");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });

  test("get a user - deleted user", async () => {
    await eventService.deleteAllUsers();
    await eventService.createUser(kevin);
    await eventService.authenticate(kevin);
    try {
      const returnedUser = await eventService.getUser(users[0]._id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });
});