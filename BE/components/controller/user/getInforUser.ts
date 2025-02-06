import { NextFunction, Response, Request } from "express";
import prisma from "../../../lib/prisma";

export async function getInforUser(
    req: any,
    res: Response,
    next: NextFunction
) {
    console.log("🚀 ~ file: src/controler/user/getInforUser");
    const userId = parseInt(req.user.id as string, 10);
    try {
        const inforUser = await prisma.users.findUnique({
            where: {
                id: userId,
            },
            select: {
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
                address1: true,
                address2: true,
                country: true,
            }
        })
        console.log("🚀 ~ file: getInforUser ~ 200 ~ Get infor user success");
        res.status(200).json({ inforUser: inforUser });
    }
    catch (e) {
        console.error("Error changing password:", e);
        res.status(500).json({ msg: "An error occurred while getting infor user" });
    }
}
