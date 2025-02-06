import { NextFunction, Response, Request } from "express";
import prisma from "../../../lib/prisma";

export async function getNewProduct(
  req: any,
  res: Response,
  next: NextFunction
) {
  console.log("🚀 ~ file: src/controler/auth/getNewProduct");
  const dayNow = new Date();
  try {
    const product = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        sku: true,
        price: true,
        stock: true,
        status: true,
        brand: true,
        imageUri: true,
        description: true,
        sale: {
          where: {
            endAt: {
              gt: dayNow,
            }
          }
        },
        color: true,
        group: true,
        size: true,
      },
      orderBy: {
        createAt: 'desc', // giảm dần
      },
      take: 12,
    });
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
    console.log("🚀 ~ file: getNewproduct ~ 200 ~ Send product data");
    res.status(200).json(productData)
  }
  catch (e) {
    console.log("🚀 ~ file: getNewproduct ~ 401 ~ Error get new product");
    res.status(401).json({ "msg": "Error get new product" })
  }
}
