import { NextFunction, Response, Request } from "express";
import { createPassword, createToken } from "../../../middleware/auth";
import connection from "../../../lib/mysql";
import prisma from "../../../lib/prisma";
export async function register(
  req: any,
  res: Response,
  next: NextFunction
) {
  console.log("🚀 ~ file: src/controler/auth/register");
  const {
    email,
    password,
    firstName,
    lastName,
    phone,
    address1,
    address2,
    country,
  }: {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    phone: string,
    address1: string,
    address2: string,
    country: string,
  } = req.body;
  const user = await prisma.users.findUnique({
    where: {
      email :  email,
    },
  })
  if (user) {
    res.status(200).json({msg: "Email already exists"});
  } else {
    const createUser = await prisma.users.create({
      data: {
        email: email,
        password: await createPassword(password),
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        address1: address1,
        address2: address2,
        country: country,
      }
    })
    if (createUser) {
    res.status(200).json({msg: "Create account success"});
    }
  }
}