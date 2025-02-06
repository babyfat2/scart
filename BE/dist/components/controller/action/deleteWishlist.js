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
exports.deleteWishlist = deleteWishlist;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
function deleteWishlist(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("🚀 ~ file: src/controler/action/deleteWishlist");
        const userId = parseInt(req.user.id, 10);
        const productId = req.body.productId;
        try {
            const deleteWishlist = yield prisma_1.default.wishlist.deleteMany({
                where: {
                    user_id: userId,
                    product_id: productId
                },
            });
            if (deleteWishlist) {
                console.log("🚀 ~ file: deleteWishlist ~ 200 ~ Delete Wishlist success");
                res.status(200).json({ msg: "Delete wishlist success" });
            }
            else {
                console.error("🚀 ~ file: deleteWishlist ~ 409 ~ Error Wishlist error");
                res.status(409).json({ msg: "Delete wishlist error" });
            }
        }
        catch (e) {
            console.error("🚀 ~ file: deleteWishlist ~ 500 ~ Error delete Wishlist:", e);
            res.status(500).json({ msg: "An error occurred while deleting wishlist" });
        }
    });
}
