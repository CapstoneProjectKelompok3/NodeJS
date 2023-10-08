import app from "../../main";
import request from "supertest";
import { faker } from "@faker-js/faker";

describe("User Register", () => {
  it("Should return 200 when register data user success", async () => {
    const data = {
      email: faker.internet.email(),
      username: faker.internet.userName(),
      nik: faker.number
        .int({
          min: 3201121611111111,
          max: 3201123011111111,
        })
        .toString(),
      password: "password",
    };

    const response = await request(app).post("/users/register").send(data);

    const { status_code, result, message } = response.body;

    expect(status_code).toEqual(200);
    expect(result).toBe("success");
    expect(message).toBe("record has been created");
  });

  it("Should return 200 when register data admin success", async () => {
    const data = {
      email: faker.internet.email(),
      username: faker.internet.userName(),
      nik: faker.number
        .int({
          min: 3201121611111111,
          max: 3201123011111111,
        })
        .toString(),
      password: "password",
      level: "admin",
    };

    const response = await request(app).post("/users/register").send(data);

    const { status_code, result, message } = response.body;

    expect(status_code).toEqual(200);
    expect(result).toBe("success");
    expect(message).toBe("record has been created");
  });

  it("Should return 400 when request body doesn't meet the requirements", async () => {
    // missing request body email & username
    const data = {
      nik: faker.number
        .int({
          min: 3201121611111111,
          max: 3201123011111111,
        })
        .toString(),
      password: "password",
    };

    const response = await request(app).post("/users/register").send(data);

    const { status_code, result } = response.body;

    expect(status_code).toEqual(400);
    expect(result).toBe("bad request");
  });

  it("Should return 400 when field length less than requirement", async () => {
    // username & password length less than requirements
    const data = {
      email: faker.internet.email(),
      username: "abi",
      nik: faker.number
        .int({
          min: 3201121611111111,
          max: 3201123011111111,
        })
        .toString(),
      password: "salah",
    };

    const response = await request(app).post("/users/register").send(data);

    const { status_code, result } = response.body;

    expect(status_code).toEqual(400);
    expect(result).toBe("bad request");
  });
});
