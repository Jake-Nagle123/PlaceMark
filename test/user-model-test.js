import { assert } from "chai";
import { db } from "../src/models/db.js";

suite("User API tests", () => {

  const kevin = {
    firstName: "Kevin",
    lastName: "Malone",
    email: "kevin@malone.com",
    password: "office",
  };

  setup(async () => {
    db.init();
  });

  test("create a user", async () => {
    const newUser = await db.userStore.addUser(kevin);
    assert.deepEqual(kevin, newUser)
  });
});