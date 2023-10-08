import app, { server } from "../../main";
import request from "supertest";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();

describe("Password Change", () => {
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

  it("Should successfully change user password", async () => {
    const data = {
      currentPass: "@1Password",
      newPass: "Password@1",
      repeatPass: "Password@1",
    };

    const response = await request(app)
      .put("/users/changepass")
      .set("Authorization", `Bearer ${token}`)
      .send(data);

    const { status_code, result, message } = response.body;

    expect(status_code).toEqual(200);
    expect(result).toBe("success");
    expect(message).toBe("password anda berhasil diubah");
  });

  it("Should return an error if repeatPass is not filled", async () => {
    const data = {
      currentPass: "@1Password",
      newPass: "Password@1",
    };

    const response = await request(app)
      .put("/users/changepass")
      .set("Authorization", `Bearer ${token}`)
      .send(data);

    const { status_code, result, message } = response.body;

    expect(status_code).toEqual(400);
    expect(result).toBe("bad request");
    expect(message).toEqual({
      undefined: '"newPass" missing required peer "repeatPass"',
    });
  });

  it("Should return an error if newPass is not filled", async () => {
    const data = {
      currentPass: "@1Password",
      repeatPass: "Password@1",
    };

    const response = await request(app)
      .put("/users/changepass")
      .set("Authorization", `Bearer ${token}`)
      .send(data);

    const { status_code, result, message } = response.body;
    console.log(message);

    expect(status_code).toEqual(400);
    expect(result).toBe("bad request");
    expect(message).toEqual({
      repeatPass: '"repeatPass" must be [ref:newPass]',
    });
  });
});
