import { NextFunction, Response, Request } from "express";
import prisma from "../../../lib/prisma";

export async function deleteCompare(
  req: any,
  res: Response,
  next: NextFunction
) {
  console.log("🚀 ~ file: src/controler/action/deleteCompare");
  const userId = parseInt(req.user.id as string, 10);
  const productId = req.body.productId;
  try {
    const deleteCompare = await prisma.compare.deleteMany({
      where: {
        user_id: userId,
        product_id: productId
      },
    })
    if (deleteCompare) {
      console.log("🚀 ~ file: deleteCompare ~ 200 ~ Delete compare success");
      res.status(200).json({ msg: "Delete compare success" });
    } else {
      console.error("🚀 ~ file: deleteCompare ~ 409 ~ Delete compare success");
      res.status(409).json({ msg: "Delete compare error" });
    }
  } catch (e) {
    console.error("🚀 ~ file: deleteCompare ~ 500 ~ Error delete Compare:", e);
    res.status(500).json({ msg: "An error occurred while deleting compare" });
  }
}
