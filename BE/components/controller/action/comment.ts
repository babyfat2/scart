import { NextFunction, Response, Request } from "express";
import prisma from "../../../lib/prisma";
import { IComment } from "../../../type/type";

export async function comment(
  req: any,
  res: Response,
  next: NextFunction
) {
  console.log("🚀 ~ file: src/controler/action/comment");
  const comment: IComment = req.body;
  try {
    const createComment = await prisma.review.create({
      data: {
        name: comment.name,
        content: comment.content,
        rate: comment.rate,
        product_id: comment.product_id,
      }
    })
    const allComment = await prisma.review.findMany({
      where: {
        product_id: comment.product_id
      },
      select: {
        name: true,
        rate: true,
        content: true,
        createAt: true,
      }
    })
    if (createComment) {
      console.log("🚀 ~ file: comment ~ 201 ~ add comment success");
      res.status(201).json({ msg: "Add comment success", review: allComment });
    } else {
      console.error("🚀 ~ file: comment ~ 409 ~ Add comment success");
      res.status(409).json({ msg: "Add comment failed" });
    }
  }
  catch (e) {
    console.error("🚀 ~ file: addCart ~ Error add comment:", e);
    res.status(500).json({ msg: "An error occurred while adding comment" });
  }
}
