import { assert } from "chai";
import { eventService } from "./event-service.js";
import { assertSubset } from "../test-utils.js";
import { kevin, testUsers } from "../fixtures.js";

suite("User API tests", () => {
  setup(async () => {
    await eventService.deleteAllUsers();
    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testUsers[i] = await eventService.createUser(testUsers[i]);
    }
  });
  teardown(async () => {
  });

  test("create a user", async () => {
    const newUser = await eventService.createUser(kevin);
    assertSubset(kevin, newUser);
    assert.isDefined(newUser._id);
  });

  test("delete all users", async () => {
    let returnedUsers = await eventService.getAllUsers();
    assert.equal(returnedUsers.length, 3);
    await eventService.deleteAllUsers();
    returnedUsers = await eventService.getAllUsers();
    assert.equal(returnedUsers.length, 0);
  });

  test("get a user - success", async () => {
    const returnedUser = await eventService.getUser(testUsers[0]._id);
    assert.deepEqual(testUsers[0], returnedUser);
  });

  test("get a user - bad id", async () => {
    try {
      const returnedUser = await eventService.getUser("1234");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 503);
    }
  });

  test("get a user - deleted user", async () => {
    await eventService.deleteAllUsers();
    try {
      const returnedUser = await eventService.getUser(testUsers[0]._id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });
});