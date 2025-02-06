import { NextFunction, Response, Request } from "express";
import prisma from "../../../lib/prisma";

export async function getHistoryOrder(
    req: any,
    res: Response,
    next: NextFunction
) {
    console.log("🚀 ~ file: src/controler/user/getHistoryOrder");
    const userId = parseInt(req.user.id as string, 10);
    try {
        const historyOrder = await prisma.checkout.findMany({
            where: {
                user_id: userId
            },
            select: {
                id: true,
                orderStatus: true,
                createAt: true,
                product_checkout:{
                    select: {
                        amount: true,
                        product: {
                            select: {
                                price: true,
                            }
                        }
                    }
                }
            }
        })
        const result = historyOrder.map((e) =>{
            let a = 0
            const total = e.product_checkout.map((e) => {
                a += e.amount * e.product.price;
            })
            return {
                id: e.id,
                orderStatus: e.orderStatus,
                createAt: e.createAt,
                total: a,
            }
        })
        console.log("🚀 ~ file: getHistoryOrder ~ 200 ~ Get history success")
        res.status(200).json({"history": result})
    }
    catch (e) {
        console.error("🚀 ~ file: getHistoryOrder ~ 500 ~ Error get history order:", e);
        res.status(500).json({ msg: "An error occurred while getting history order" });
    }
}
