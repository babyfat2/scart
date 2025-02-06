"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryptRefreshToken = exports.decryptCookie = exports.createRefreshToken = exports.createToken = exports.comparePassword = exports.createPassword = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const createPassword = (password) => {
    return bcrypt_1.default.hash(password, 5);
};
exports.createPassword = createPassword;
const comparePassword = (password, hashPassword) => {
    return bcrypt_1.default.compare(password, hashPassword);
};
exports.comparePassword = comparePassword;
const createToken = (user) => {
    const token = jsonwebtoken_1.default.sign({ email: user.email, id: user.id }, process.env.SECRETTOKEN || "", { expiresIn: "1h", });
    return token;
};
exports.createToken = createToken;
const createRefreshToken = (user) => {
    const token = jsonwebtoken_1.default.sign({ email: user.email, id: user.id }, process.env.SECRETREFRESHTOKEN || "", { expiresIn: "15d", });
    return token;
};
exports.createRefreshToken = createRefreshToken;
const decryptCookie = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        const user = jsonwebtoken_1.default.verify(authToken, process.env.SECRETTOKEN || "");
        req.user = user;
        req.authToken = authToken;
        next();
    }
    catch (e) {
        console.error(e);
        res.status(401).json({ msg: "invalid token" });
    }
});
exports.decryptCookie = decryptCookie;
const decryptRefreshToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        const user = jsonwebtoken_1.default.verify(refreshToken, process.env.SECRETREFRESHTOKEN || "");
        req.user = user;
        req.refreshToken = refreshToken;
        next();
    }
    catch (e) {
        console.error(e);
        res.status(401).json({ msg: "invalid refresh token" });
    }
});
exports.decryptRefreshToken = decryptRefreshToken;
