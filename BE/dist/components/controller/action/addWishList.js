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
exports.addWishlist = addWishlist;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
function addWishlist(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("🚀 ~ file: src/controler/action/addWishlist");
        const userId = parseInt(req.user.id, 10);
        const productId = req.body.productId;
        try {
            const createWishlist = yield prisma_1.default.wishlist.create({
                data: {
                    user_id: userId,
                    product_id: productId,
                }
            });
            if (createWishlist) {
                console.info("🚀 ~ file: addCart ~ 201 ~ Add wishlist success");
                res.status(201).json({ msg: "Add wishlist success" });
            }
            else {
                console.error("🚀 ~ file: addCart ~ 409 ~ Add wishlist error");
                res.status(409).json({ msg: "Add wishlist error" });
            }
        }
        catch (e) {
            console.error("🚀 ~ file: addCart ~ Error add wishlist:", e);
            res.status(500).json({ msg: "An error occurred while adding wishlist" });
        }
    });
}
