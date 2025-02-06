import { NextFunction, Response, Request } from "express";
import prisma from "../../../lib/prisma";

export async function getOrderDetail(
    req: any,
    res: Response,
    next: NextFunction
) {
    console.log("🚀 ~ file: src/controler/user/getOrderDetail");
    const checkoutId = req.query.checkoutId; 
    try {
        const inforBuyer = await prisma.checkout.findFirst({
            where: {
                id: checkoutId,
            },
            select: {
                firstName: true,
                lastName: true,
                phone: true,
                email: true,
                address1: true,
                address2: true,
                country: true,
                orderStatus: true,
                shipping: true,
                payment: true,
            }
        })
        const product = await prisma.product_checkout.findMany({
            where: {
                checkout_id: checkoutId,
            },
            select: {
                product: true,
                amount: true,
            }
        })
        console.log("🚀 ~ file: getOrderDetail ~ 200 ~ Get order detail success")
        res.status(200).json({product: product, inforBuyer: inforBuyer})
    }
    catch (e) {
        console.error("🚀 ~ file: getHistoryOrder ~ 500 ~ Error get order detail:", e);
        res.status(500).json({ msg: "An error occurred while getting order detail" });
    }
}
