import { NextFunction, Response, Request } from "express";
import prisma from "../../../lib/prisma";
import { comparePassword, createPassword } from "../../../middleware/auth";

export async function changePassword(
    req: any,
    res: Response,
    next: NextFunction
) {
    console.log("🚀 ~ file: src/controler/user/changePassword");
    const userId = parseInt(req.user.id as string, 10);
    const { newPassword, oldPassword } = req.body;
    try {
        const user = await prisma.users.findUnique({
            where: {
                id: userId
            },
            select: {
                password: true,
            }
        })
        if (user && await comparePassword(oldPassword, user?.password)) {
            const inforUser = await prisma.users.update({
                where: {
                    id: userId,
                },
                data: {
                    password: await createPassword(newPassword),
                }
            })
            console.log("🚀 ~ file: changePassword ~ 200 ~ Change Password success");
            res.status(200).json({ msg: "Change password success" });
        } else {
            console.log("🚀 ~ file: changePassword ~ 400 ~ Password incorrect");
            res.status(400).json({ msg: "Password incorrect" })
        }
    }
    catch (e) {
        console.error("🚀 ~ file: changePassword ~ 500 ~ Error changing password:", e);
        res.status(500).json({ msg: "An error occurred while changing the password" });
    }
}
