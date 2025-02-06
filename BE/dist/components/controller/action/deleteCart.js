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
exports.deleteCart = deleteCart;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
function deleteCart(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("🚀 ~ file: src/controler/action/deleteCart");
        const userId = parseInt(req.user.id, 10);
        const { productId } = req.body;
        try {
            const deleteCart = yield prisma_1.default.cart.deleteMany({
                where: {
                    user_id: userId,
                    product_id: productId,
                },
            });
            if (deleteCart) {
                console.log("🚀 ~ file: deleteCart ~ 200 ~ Delete cart success");
                res.status(200).json({ msg: "Delete cart success" });
            }
            else {
                console.error("🚀 ~ file: deleteCart ~ 409 ~ Delete cart error");
                res.status(200).json({ msg: "Delete cart error" });
            }
        }
        catch (e) {
            console.error("🚀 ~ file: deleteCart ~ 500 ~ Error delete Cart:", e);
            res.status(500).json({ msg: "An error occurred while deleting cart" });
        }
    });
}
