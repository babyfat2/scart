import { NextFunction, Response, Request } from "express";
import prisma from "../../../lib/prisma";

export async function addCart(
  req: any,
  res: Response,
  next: NextFunction
) {
  console.log("🚀 ~ file: src/controler/action/addCart");
  const userId = parseInt(req.user.id as string, 10);
  const { productId, amount } = req.body;
  try {
    const createCart = await prisma.cart.create({
      data: {
        user_id: userId,
        product_id: productId,
        amount: amount,
      }
    })
    if (createCart) {
      console.info("🚀 ~ file: addCart ~ 201 ~ Add cart success");
      res.status(201).json({ msg: "Add cart success" });
    } else {
      console.error("🚀 ~ file: addCart ~ 409 ~ Add cart error");
      res.status(409).json({ msg: "Add compare error" });
    }
  } catch (e) {
    console.error("🚀 ~ file: addCart ~ Error add Cart:", e);
    res.status(500).json({ msg: "An error occurred while adding cart" });
  }
}
