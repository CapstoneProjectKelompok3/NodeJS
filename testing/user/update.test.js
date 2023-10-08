import app, { server } from "../../main";
import request from "supertest";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();

describe("User Update", () => {
  let user, token;

  const setup = async () => {
    user = await prisma.user.create({
      data: {
        email: "userhydra@gmail.com",
        username: "hailhydra",
        password: await bcrypt.hash("@1Password", 10),
        level: "user",
        is_activated: true,
        email_activated: true,
      },
    });

    await prisma.document.create({
      data: {
        user_id: user.id,
        nik: "1801093001990001",
      },
    });

    token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        level: user.level,
        username: user.username,
      },
      "rahasia",
      { expiresIn: "24h" }
    );
  };

  const teardown = async () => {
    await prisma.document.delete({
      where: {
        nik: "1801093001990001",
      },
    });

    await prisma.user.delete({
      where: {
        email: "userhydra@gmail.com",
      },
    });
  };

  beforeAll(setup);
  afterAll(teardown);

  it("Should successfully update user data", async () => {
    const data = {
      username: "newusername",
      nik: "1801093001990001",
    };

    const response = await request(app)
      .put("/users/update")
      .set("Authorization", `Bearer ${token}`)
      .send(data);

    const { status_code, result, message } = response.body;

    expect(status_code).toEqual(200);
    expect(result).toBe("success");
    expect(message).toBe("data berhasil diperbarui");
  });

  it("Should return bad request when update user data with wrong json variables", async () => {
    const data = {
      usernames: "newusername",
      niks: "1801093001990001",
    };

    const response = await request(app)
      .put("/users/update")
      .set("Authorization", `Bearer ${token}`)
      .send(data);

    const { status_code, result, message } = response.body;

    expect(status_code).toEqual(400);
    expect(result).toBe("bad request");
    expect(message).toEqual({
      usernames: '"usernames" is not allowed',
      niks: '"niks" is not allowed',
    });
  });

  it("Should return bad request nik update is not following the requirement", async () => {
    const data = {
      nik: "1",
    };

    const response = await request(app)
      .put("/users/update")
      .set("Authorization", `Bearer ${token}`)
      .send(data);

    const { status_code, result, message } = response.body;
    console.log(response.body);

    expect(status_code).toEqual(400);
    expect(result).toBe("bad request");
    expect(message).toEqual({
      nik: '"nik" with value "1" fails to match the nik pattern',
    });
  });

  it("Should return bad request username update is not following the requirement", async () => {
    const data = {
      username: "a",
    };

    const response = await request(app)
      .put("/users/update")
      .set("Authorization", `Bearer ${token}`)
      .send(data);

    const { status_code, result, message } = response.body;

    expect(status_code).toEqual(400);
    expect(result).toBe("bad request");
    expect(message).toEqual({
      username: '"username" length must be at least 6 characters long',
    });
  });
});
