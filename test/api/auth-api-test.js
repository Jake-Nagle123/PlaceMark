import { assert } from "chai";
import { eventService } from "./event-service.js";
import { decodeToken } from "../../src/api/jwt-utils.js";
import { kevin } from "../fixtures.js";

suite("Authentication API tests", async () => {
  setup(async () => {
    eventService.clearAuth();
    await eventService.createUser(kevin);
    await eventService.authenticate(kevin);
    await eventService.deleteAllUsers();
  });

  test("authenticate", async () => {
    const returnedUser = await eventService.createUser(kevin);
    const response = await eventService.authenticate(kevin);
    assert(response.success);
    assert.isDefined(response.token);
  });

  test("verify Token", async () => {
    const returnedUser = await eventService.createUser(kevin);
    const response = await eventService.authenticate(kevin);

    const userInfo = decodeToken(response.token);
    assert.equal(userInfo.email, returnedUser.email);
    assert.equal(userInfo.userId, returnedUser._id);
  });
});
