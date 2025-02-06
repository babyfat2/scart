import { NextFunction, Response, Request } from "express";

export async function logout(
  req: any,
  res: Response,
  next: NextFunction
) {
  console.log("🚀 ~ file: src/controler/action/logout");
  res.clearCookie('authToken', {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    path: '/',
  });
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    path: '/api/refreshToken',
  });
  res.status(200).json({ msg: "Logout success" });
}