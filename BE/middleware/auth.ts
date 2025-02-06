import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";


export const createPassword = (password: string) => {
  return bcrypt.hash(password, 5);
}

export const comparePassword = (password: string, hashPassword: string) => {
  return bcrypt.compare(password, hashPassword);
}

export const createToken = (user: {
  email: string;
  id: string;
}) => {
  const token = jwt.sign(
    { email: user.email, id: user.id },
    process.env.SECRETTOKEN || "",
    { expiresIn: "1h", }
  );

  return token;
}

export const createRefreshToken = (user: {
  email: string;
  id: string;
}) => {
  const token = jwt.sign(
    { email: user.email, id: user.id },
     process.env.SECRETREFRESHTOKEN || "",
    { expiresIn: "15d", }
  );

  return token;
}

export const decryptCookie = async (req: any, res: Response, next: NextFunction): Promise<void> => {
  const cookie = req.cookies;

  if (!cookie) {
    res.status(401).json({ msg: "Unauthorized" });
    return;
  }
  const authToken = cookie.authToken;
  if (!authToken) {
    res.status(401).json({ ms: "Unauthorized" });
    return;
  }
  try {
    const user = jwt.verify(authToken, process.env.SECRETTOKEN || "");
    req.user = user;
    req.authToken = authToken;
    next();
  } catch (e) {
    console.error(e);
    res.status(401).json({ msg: "invalid token" });
  }
};

export const decryptRefreshToken = async (req: any, res: Response, next: NextFunction): Promise<void> => {
  const cookie = req.cookies;

  if (!cookie) {
    res.status(401).json({ msg: "Unauthorized" });
    return;
  }
  const refreshToken = cookie.refreshToken;
  if (!refreshToken) {
    res.status(401).json({ ms: "Unauthorized" });
    return;
  }
  try {
    const user = jwt.verify(refreshToken, process.env.SECRETREFRESHTOKEN || "");
    req.user = user;
    req.refreshToken = refreshToken;
    next();
  } catch (e) {
    console.error(e);
    res.status(401).json({ msg: "invalid refresh token" });
  }
};