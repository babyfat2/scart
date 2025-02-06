import { NextFunction, Response, Request } from "express";
import { createToken } from "../../../middleware/auth";

export async function refreshToken(
  req: any,
  res: Response,
  next: NextFunction
) {
  console.log("🚀 ~ file: src/controler/action/refreshToken");
  const user = req.user;
  const authToken = createToken({email: user.email, id: user.id})
  res.cookie('authToken', authToken, {
    httpOnly: true,
    secure: false, 
    sameSite: 'lax', 
    maxAge: 15 * 60 * 60 * 1000, 
  });
  res.status(200).json({msg: "refreshToken success"});
}
