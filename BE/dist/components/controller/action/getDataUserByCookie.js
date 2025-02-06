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
exports.getDataUserByCookie = getDataUserByCookie;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
function getDataUserByCookie(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("🚀 ~ file: src/controler/action/getDataUserByCookie");
        const userId = parseInt(req.user.id, 10);
        const user = yield prisma_1.default.users.findUnique({
            where: {
                id: userId,
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
        if (user) {
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
            res.status(200).json({ data: userData });
        }
        else {
            res.status(200).json({ msg: "User is incorrect!" });
        }
    });
}
