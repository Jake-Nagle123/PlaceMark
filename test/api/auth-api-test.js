import { assert } from "chai";
import { eventService } from "./event-service.js";
import { decodeToken } from "../../src/api/jwt-utils.js";
import { kevin, kevinCredentials } from "../fixtures.js";

suite("Authentication API tests", async () => {
  setup(async () => {
    eventService.clearAuth();
    await eventService.createUser(kevin);
    await eventService.authenticate(kevinCredentials);
    await eventService.deleteAllUsers();
  });

  test("authenticate", async () => {
    const returnedUser = await eventService.createUser(kevin);
    const response = await eventService.authenticate(kevinCredentials);
    assert(response.success);
    assert.isDefined(response.token);
  });

  test("verify Token", async () => {
    const returnedUser = await eventService.createUser(kevin);
    const response = await eventService.authenticate(kevinCredentials);

    const userInfo = decodeToken(response.token);
    assert.equal(userInfo.email, returnedUser.email);
    assert.equal(userInfo.userId, returnedUser._id);
  });

  test("check Unauthorized", async () => {
    eventService.clearAuth();
    try {
      await eventService.deleteAllUsers();
      assert.fail("Route not protected");
    } catch (error) {
      assert.equal(error.response.data.statusCode, 401);
    }
  });
});
