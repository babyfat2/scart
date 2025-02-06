import { NextFunction, Response, Request } from "express";
import prisma from "../../../lib/prisma";

export async function getDataUserByCookie(
  req: any,
  res: Response,
  next: NextFunction
) {
  console.log("🚀 ~ file: src/controler/action/getDataUserByCookie");
  const userId = parseInt(req.user.id as string, 10);
  const user = await prisma.users.findUnique({
    where:{
      id: userId,
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
  if (user) {
    const cart = user.cart.map((e) => { return {product: e.product, amount: e.amount}});
    const compare = user.compare.map((e) => { return e.product });
    const wishlist = user.wishlist.map((e) => { return e.product });
    const userData = {
      firstName: user.firstName,
      lastName: user.lastName,
      cart: cart,
      wishlist: wishlist,
      compare: compare,
    }
    res.status(200).json({data: userData});
  } else {
    res.status(200).json({msg: "User is incorrect!"})
  }
}
