import { NextFunction, Response, Request } from "express";
import connection from "../../../lib/mysql";
import prisma from "../../../lib/prisma";

export async function getAllBlog(
  req: any,
  res: Response,
  next: NextFunction
) {
  console.log("🚀 ~ file: src/controler/auth/getAllBlog");
  try {
    const allBlog = await prisma.blog.findMany({

    })
    console.log("🚀 ~ file: getAllBlog ~ 200 ~ Send product data");
    res.status(200).json(allBlog)
  }
  catch (e) {
    console.log("🚀 ~ file: getAllBlog ~ 401 ~ Error get new product");
    res.status(401).json({ "msg": "Error get all blog" })
  }
}
