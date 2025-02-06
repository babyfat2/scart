import { NextFunction, Response, Request } from "express";
import prisma from "../../../lib/prisma";

export async function getProductSpecial(
    req: any,
    res: Response,
    next: NextFunction
  ) {
    console.log("🚀 ~ file: src/controler/auth/getProductSpecial");
    const product = await prisma.product.findMany({
      select: {
        id: true,
        sku: true,
        name: true,
        price: true,
        status: true,
        stock: true,
        category: true,
        brand: true,
        imageUri: true,
        description: true,
        size: true,
        color: true,
        sale: true,
      },
      take: 3,
      skip: 4,
    })

    const productData = product.map((e) => {
      if (e.sale[0]) {
      const sale = e.sale[0];
      return {
        ...e,
        sale: sale
      }
      } else {
        return e;
      }
    })
    res.status(200).json({product: productData});
  }
