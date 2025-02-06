import { NextFunction, Response, Request } from "express";
import prisma from "../../../lib/prisma";
import { comparePassword, createRefreshToken, createToken, } from "../../../middleware/auth";

export async function login(
  req: any,
  res: Response,
  next: NextFunction
) {
  console.log("🚀 ~ file: src/controler/auth/login");
  const {email, password} : {email: string, password: string} = req.body;
  const user = await prisma.users.findUnique({
    where:{
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
          amount: true,
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
  if (user && await comparePassword(password, user.password)) {
    const cart = user.cart.map((e) => { return {product: e.product, amount: e.amount}  });
    const compare = user.compare.map((e) => { return e.product });
    const wishlist = user.wishlist.map((e) => { return e.product });
    const userData = {
      firstName: user.firstName,
      lastName: user.lastName,
      cart: cart,
      wishlist: wishlist,
      compare: compare,
    }
    const authToken = createToken({email: user.email, id: user.id.toString()});
    const refreshToken = createRefreshToken({email: user.email, id: user.id.toString()});
    res.cookie('authToken', authToken, {
      httpOnly: true,
      secure: false, 
      sameSite: 'lax', 
      maxAge: 24 * 60 * 60 * 1000, 
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false, 
      sameSite: 'lax',
      maxAge: 15 * 24 * 60 * 60 * 1000,
      path: '/api/refreshToken',
    });
    res.status(200).json({msg: "Login success", data: userData});
  } else {
    res.status(401).json({msg: "User or password is incorrect!"})
  }
}