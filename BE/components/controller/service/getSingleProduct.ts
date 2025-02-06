import { NextFunction, Response, Request } from "express";
import prisma from "../../../lib/prisma";

export async function getSingleProduct(
    req: any,
    res: Response,
    next: NextFunction
  ) {
    console.log("🚀 ~ file: src/controler/auth/getSingleProduct" );
    const product_id = req.query.id;
    const dayNow = new Date();
    try {
    const product = await prisma.product.findUnique({
      where: {
        id: product_id,
      },
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
        sale: {
          where: {
            endAt: {
              gt: dayNow,
            }
          }
        },
        group: true,
        review: true,
      }
    })
    if (product) {
      var sale;
      var group;
      if (product.sale) {
        sale = product.sale[0];
      }
      if (product.group) {
        group = product.group[0];
      }
    const productSingleData = {
      id: product.id,
      name: product.name,
      sku: product.sku,
      price: product.price,
      status: product.status,
      stock: product.stock,
      category: product.category,
      brand: product.brand,
      imageUri: product.imageUri,
      description: product.description,
      size: product.size,
      color: product.color,
      group: group,
      sale: sale,
      review: product.review,
    }
    /*
    Lấy các sản phẩm có `brand` hoặc `category` liên quan
    */
    const productRecommend = await prisma.product.findMany({
      where: {
        OR: [
          {
            brand : product?.brand
          },
          {
            category: product?.category
          }
        ], 
        NOT: {
          id: product?.id
        } // không lấy sản phần trùng id với sản phẩm trên
      },
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
        sale: true,
      },
      take: 3,
    })
    res.status(200).json({singleProduct: productSingleData, recommend: productRecommend});
  }
  }
  catch(e) {
    console.log("🚀 ~ file: getSingleproduct ~ Error :" + e);
  }
}