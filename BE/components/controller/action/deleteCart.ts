import { NextFunction, Response, Request } from "express";
import prisma from "../../../lib/prisma";

export async function deleteCart(
  req: any,
  res: Response,
  next: NextFunction
) {
  console.log("🚀 ~ file: src/controler/action/deleteCart");
  const userId = parseInt(req.user.id as string, 10);
  const { productId } = req.body;
  try {
    const deleteCart = await prisma.cart.deleteMany({
      where: {
        user_id: userId,
        product_id: productId,
      },
    })
    if (deleteCart) {
      console.log("🚀 ~ file: deleteCart ~ 200 ~ Delete cart success");
      res.status(200).json({ msg: "Delete cart success" });
    } else {
      console.error("🚀 ~ file: deleteCart ~ 409 ~ Delete cart error");
      res.status(200).json({ msg: "Delete cart error" });
    }
  } catch (e) {
    console.error("🚀 ~ file: deleteCart ~ 500 ~ Error delete Cart:", e);
    res.status(500).json({ msg: "An error occurred while deleting cart" });
  }
}
