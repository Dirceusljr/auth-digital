import { compare, hash } from "bcrypt";
import { Router } from "express";
import prisma from "../../prisma/prismaClient.js";
import jwt from "jsonwebtoken";

const { sign } = jwt;

const route = Router();

route
  .post("/user/login", async (req, res) => {
    const { email, password } = req.body;

    const jsonSecret = process.env.JSON_SECRET;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    const senhasIguais = await compare(password, user[0].password);

    if (!senhasIguais) {
      throw new Error("Usuario ou senha incorretos");
    }

    const accessToken = sign({ id: user[0].id, email: user[0].email }, jsonSecret, {
      expiresIn: "1h",
    });

    res.status(200).json({ accessToken });
  })
  .post("/user", async (req, res) => {
    const { name, email, password } = req.body;
    console.log(req.body)
    const passwordHash = hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: passwordHash,
      },
    });

    res.status(201).json(user);
  });

export default route;
