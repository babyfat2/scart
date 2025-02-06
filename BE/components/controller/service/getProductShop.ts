import { NextFunction, Response, Request } from "express";
import prisma from "../../../lib/prisma";
import { skip } from "node:test";

export async function getProductShop(
    req: any,
    res: Response,
    next: NextFunction
  ) {
    console.log("🚀 ~ file: src/controler/auth/getProductShop");
    const page = parseInt(req.query.page as string, 10) * 12;
    const filter_sort = req.query.filter_sort;
    console.log(filter_sort);
    const amount = await prisma.product.count();
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
      take: 12,
      skip: page >= 0 ? page : 0,
      orderBy: [
        filter_sort === "price_desc" ? {
          price: 'desc',
        } : { },
        filter_sort === "price_asc" ? {
          price: 'asc',
        } : { },
        filter_sort === "id_desc" ? {
          id: 'desc',
        } : { },
        filter_sort === "id_asc" ? {
          id: 'asc',
        } : { },
      ]
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
    res.status(200).json({product: productData, amount: amount});
  }
