import { NextFunction, Response, Request } from "express";
import prisma from "../../../lib/prisma";
import { IUser } from "../../../type/type";

export async function changeInformation(
    req: any,
    res: Response,
    next: NextFunction
) {
    console.log("🚀 ~ file: src/controler/user/changeInformation");
    const userId = parseInt(req.user.id as string, 10);
    const userInfor: IUser = req.body;
    try {
    const inforUser = await prisma.users.update({
        where: {
            id: userId,
        },
        data: {
            firstName: userInfor.firstName,
            lastName: userInfor.lastName,
            phone: userInfor.phone,
            address1: userInfor.address1,
            address2: userInfor.address2,
            country: userInfor.country,
        }
    })
    console.log("🚀 ~ file: changeInformation ~ 200 ~ ChangeInformation success");
    res.status(200).json({ msg: "Change information success", inforUser: inforUser });
    } 
    catch(e) {
        console.error("Error changing information:", e);
        res.status(500).json({ msg: "An error occurred while changing information" });
    }
}
