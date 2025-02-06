import { NextFunction, Response, Request } from "express";
import prisma from "../../../lib/prisma";

export async function addWishlist(
  req: any,
  res: Response,
  next: NextFunction
) {
  console.log("🚀 ~ file: src/controler/action/addWishlist");
  const userId = parseInt(req.user.id as string, 10);
  const productId = req.body.productId;
  try {
    const createWishlist = await prisma.wishlist.create({
      data: {
        user_id: userId,
        product_id: productId,
      }
    })
    if (createWishlist) {
      console.info("🚀 ~ file: addCart ~ 201 ~ Add wishlist success");
      res.status(201).json({ msg: "Add wishlist success" });
    } else {
      console.error("🚀 ~ file: addCart ~ 409 ~ Add wishlist error");
      res.status(409).json({ msg: "Add wishlist error" });
    }
  } catch (e) {
    console.error("🚀 ~ file: addCart ~ Error add wishlist:", e);
    res.status(500).json({ msg: "An error occurred while adding wishlist" });
  }
}
