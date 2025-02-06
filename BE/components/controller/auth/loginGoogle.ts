import axios from "axios";
import { NextFunction, Response, Request } from "express";
import { OAuth2Client } from "google-auth-library";
import prisma from "../../../lib/prisma";
import { createToken, createPassword } from "../../../middleware/auth";

const client = new OAuth2Client('349673126406-n35a98jb3d0hcmdkono6biavqp0rd006.apps.googleusercontent.com');

export async function loginGoogle(
  req: any,
  res: Response,
  next: NextFunction
) {
  console.log("🚀 ~ file: src/controler/auth/loginGoogle");
  const { token } = req.body;
  const response = await axios.get("https://www.googleapis.com/oauth2/v1/userinfo", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const email = response.data.email + ".google";
  const password = response.data.id;
  const firstName = response.data.given_name;
  const lastName = response.data.family_name;
  const user = await prisma.users.findUnique({
    where: {
      email: email,
    },
    select: {
      email: true,
      password: true,
      id: true,
      firstName: true,
      lastName: true,
      cart: {
        select: {
          product: true,
        }
      },
      wishlist: {
        select: {
          product: true,
        }
      },
      compare: {
        select: {
          product: true,
        }
      }
    },
  })
  if (user) {
    const cart = user.cart.map((e) => { return e.product });
    const compare = user.compare.map((e) => { return e.product });
    const wishlist = user.wishlist.map((e) => { return e.product });
    const userData = {
      firstName: user.firstName,
      lastName: user.lastName,
      cart: cart,
      wishlist: wishlist,
      compare: compare,
    }
    const token = createToken({ email: user.email, id: user.id.toString() });
    res.status(200).json({ msg: "Login success", token: token, data: userData });
  } else {
    const userCreate = await prisma.users.create({
      data: {
        email: email,
        password: await createPassword(password),
        firstName: firstName,
        lastName: lastName,
      },
    })
    const userData = {
      firstName: userCreate.firstName,
      lastName: userCreate.lastName,
      cart: [],
      wishlist: [],
      compare: [],
    }
    const token = createToken({ email: userCreate.email, id: userCreate.id.toString() });
    res.status(200).json({ msg: "Login success", token: token, data: userData });
  }
}