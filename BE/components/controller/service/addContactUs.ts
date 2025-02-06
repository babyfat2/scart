import { NextFunction, Response, Request } from "express";
import connection from "../../../lib/mysql";
import prisma from "../../../lib/prisma";

export async function addContactUs(
  req: any,
  res: Response,
  next: NextFunction
) {
  console.log("🚀 ~ file: src/controler/service/addContactUs");
  const {
    name,
    email,
    phone,
    subject,
    content,
  } = req.body;
  try {
    const addContactUs = await prisma.contact.create({
      data: {
        name: name,
        email: email,
        phone: phone,
        subject: subject,
        content: content,
      }
    })
    console.log("🚀 ~ file: addContactUs ~ 200 ~ Add contact success");
    res.status(200).json({ "msg": "Add contact success" })
  }
  catch (e) {
    console.log("🚀 ~ file: addContactus ~ 401 ~ Error add contact" + e);
    res.status(401).json({ "msg": "Error add contact" })
  }
}
