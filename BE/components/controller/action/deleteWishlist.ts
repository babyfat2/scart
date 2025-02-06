import { NextFunction, Response, Request } from "express";
import prisma from "../../../lib/prisma";

export async function deleteWishlist(
  req: any,
  res: Response,
  next: NextFunction
) {
  console.log("🚀 ~ file: src/controler/action/deleteWishlist");
  const userId = parseInt(req.user.id as string, 10);
  const productId = req.body.productId;
  try {
  const deleteWishlist = await prisma.wishlist.deleteMany({
    where: {
        user_id: userId,
        product_id: productId
    },
  })
  if (deleteWishlist) {
    console.log("🚀 ~ file: deleteWishlist ~ 200 ~ Delete Wishlist success");
    res.status(200).json({ msg: "Delete wishlist success" });
  } else {
    console.error("🚀 ~ file: deleteWishlist ~ 409 ~ Error Wishlist error");
    res.status(409).json({ msg: "Delete wishlist error" });
  }
} catch(e) {
  console.error("🚀 ~ file: deleteWishlist ~ 500 ~ Error delete Wishlist:", e);
  res.status(500).json({ msg: "An error occurred while deleting wishlist" });
}
}
