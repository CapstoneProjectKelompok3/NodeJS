import app from "../../main";
import request from "supertest";
import { faker } from "@faker-js/faker";

describe("User Login", () => {
  it("Should return 200 when login user success", async () => {
    const datas = {
      email: "rajih@gmail.com",
      password: "password",
    };

    const response = await request(app).post("/users/login").send(datas);

    const { status_code, result, data } = response.body;

    expect(status_code).toEqual(200);
    expect(result).toBe("success");
    expect(data).toEqual(expect.any(Object));
  });

  it("Should return 400 when request body email not found", async () => {
    const data = {
      email: "rajih2@gmail.com",
      password: "password",
    };

    const response = await request(app).post("/users/login").send(data);

    const { status_code, result, message } = response.body;

    expect(status_code).toEqual(400);
    expect(result).toBe("bad request");
    expect(message).toBe("User with this email not found.");
  });

  it("Should return 400 when request body password wrong", async () => {
    const data = {
      email: "rajih@gmail.com",
      password: "passworsd",
    };

    const response = await request(app).post("/users/login").send(data);

    const { status_code, result, message } = response.body;

    expect(status_code).toEqual(400);
    expect(result).toBe("bad request");
    expect(message).toBe(
      "Invalid Password. Please check your password and try again."
    );
  });
});
