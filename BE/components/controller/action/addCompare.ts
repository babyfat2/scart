import { NextFunction, Response, Request } from "express";
import prisma from "../../../lib/prisma";

export async function addCompare(
  req: any,
  res: Response,
  next: NextFunction
) {
  console.log("🚀 ~ file: src/controler/action/addCompare");
  const userId = parseInt(req.user.id as string, 10);
  const productId = req.body.productId;
  try {
  const createCompare = await prisma.compare.create({
    data: {
      user_id: userId,
      product_id: productId,
    }
  })
  if (createCompare) {
    console.info("🚀 ~ file: addCompare ~ 201 ~ Add commpare success");
    res.status(201).json({ msg: "Add compare success" });
  } else {
    console.error("🚀 ~ file: addCompare ~ 200 ~ Add compare error");
    res.status(200).json({ msg: "Add compare error" });
  }
} catch (e) {
  console.error("🚀 ~ file: addCompare ~ Error add Compare:", e);
  res.status(500).json({ msg: "An error occurred while adding compare" });
}
}
