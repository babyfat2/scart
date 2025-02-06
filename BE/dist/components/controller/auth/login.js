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
exports.login = login;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
const auth_1 = require("../../../middleware/auth");
function login(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("🚀 ~ file: src/controler/auth/login");
        const { email, password } = req.body;
        const user = yield prisma_1.default.users.findUnique({
            where: {
                email: email,
            },
            select: {
                email: true,
                password: true,
                id: true,
                firstName: true,
                lastName: true,
                cart: {
                    select: {
                        product: true,
                        amount: true,
                    }
                },
                wishlist: {
                    select: {
                        product: true,
                    }
                },
                compare: {
                    select: {
                        product: true,
                    }
                }
            },
        });
        if (user && (yield (0, auth_1.comparePassword)(password, user.password))) {
            const cart = user.cart.map((e) => { return { product: e.product, amount: e.amount }; });
            const compare = user.compare.map((e) => { return e.product; });
            const wishlist = user.wishlist.map((e) => { return e.product; });
            const userData = {
                firstName: user.firstName,
                lastName: user.lastName,
                cart: cart,
                wishlist: wishlist,
                compare: compare,
            };
            const authToken = (0, auth_1.createToken)({ email: user.email, id: user.id.toString() });
            const refreshToken = (0, auth_1.createRefreshToken)({ email: user.email, id: user.id.toString() });
            res.cookie('authToken', authToken, {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
                maxAge: 24 * 60 * 60 * 1000,
            });
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
                maxAge: 15 * 24 * 60 * 60 * 1000,
                path: '/api/refreshToken',
            });
            res.status(200).json({ msg: "Login success", data: userData });
        }
        else {
            res.status(401).json({ msg: "User or password is incorrect!" });
        }
    });
}
