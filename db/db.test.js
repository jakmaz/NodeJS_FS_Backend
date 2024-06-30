const { saveUser, connect, findUser, disconnect } = require("./db");
const mongoose = require("mongoose");
const User = require("../models/userModel");

jest.mock("./db");

beforeAll(async () => {
  await connect();
});

describe("User Test Suite", () => {
  test("As a user I want to save a user to the database", async () => {
    const newUser = new User({
      _id: new mongoose.Types.ObjectId(),
      firstName: "Eric",
      lastName: "Clarke",
      address: "123 Main St",
      city: "Orlando",
      state: "FL",
      zipCode: "34256",
      email: "eric@eric.com",
      password: "123",
    });
    const user = await saveUser(newUser);

    expect(user).toHaveProperty("_id");
    expect(user.firstName).toEqual("Eric");
    expect(user.lastName).toEqual("Clarke");
    expect(user.address).toEqual("123 Main St");
    expect(user.city).toEqual("Orlando");
    expect(user.state).toEqual("FL");
    expect(user.zipCode).toEqual("34256");
    expect(user.email).toEqual("eric@eric.com");
    expect(user.password).toEqual("123");
  });

  test("As a user I want to find a user by any property", async () => {
    const obj = { firstName: "Eric" };

    await findUser(obj)
      .then((user) => {
        expect(user.firstName).toBe("Eric");
      })
      .catch((err) => {
        console.log("Error" + err.message);
      });
  });
});

afterAll(async () => {
  return await disconnect();
});
