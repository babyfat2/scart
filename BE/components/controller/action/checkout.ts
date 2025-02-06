import { NextFunction, Response, Request } from "express";
import prisma from "../../../lib/prisma";
import { ICart, IUser } from "../../../type/type";

export async function checkout(
  req: any,
  res: Response,
  next: NextFunction
) {
  console.log("🚀 ~ file: src/controler/action/checkout");
  const userId = parseInt(req.user.id as string, 10);
  const inforBuyer: IUser = req.body.inforBuyer;
  const { shipping, payment, coupon_id } = req.body;
  const cart: ICart[] = req.body.cart;
  const status = "new";
  try {
    await prisma.$transaction(async (prisma) => {
      const createCheckout = await prisma.checkout.create({
        data: {
          user_id: userId,
          firstName: inforBuyer.firstName,
          lastName: inforBuyer.lastName,
          email: inforBuyer.email,
          address1: inforBuyer.address1,
          address2: inforBuyer.address2,
          country: inforBuyer.country,
          shipping: shipping,
          payment: payment,
          coupon_id: coupon_id,
          orderStatus: status,
        },
      });

      const deleteCart = await prisma.cart.deleteMany({
        where: {
          user_id: userId,
        },
      });
      const checkout = await prisma.product_checkout.createMany({
        data: cart.map((e) => ({
          product_id: e.product_id,
          amount: e.amount,
          checkout_id: createCheckout.id,
        })),
      });
    });
    console.info("🚀 ~ file: checkout ~ 200 ~ Checkout success");
    res.status(200).json({ "msg": "Checkout success" });
  }
  catch (e) {
    console.error("🚀 ~ file: addCart ~ Error checkout:", e);
    res.status(201).json({ "msg": "Checkout error" })
  }
}