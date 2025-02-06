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
exports.deleteCompare = deleteCompare;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
function deleteCompare(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("🚀 ~ file: src/controler/action/deleteCompare");
        const userId = parseInt(req.user.id, 10);
        const productId = req.body.productId;
        try {
            const deleteCompare = yield prisma_1.default.compare.deleteMany({
                where: {
                    user_id: userId,
                    product_id: productId
                },
            });
            if (deleteCompare) {
                console.log("🚀 ~ file: deleteCompare ~ 200 ~ Delete compare success");
                res.status(200).json({ msg: "Delete compare success" });
            }
            else {
                console.error("🚀 ~ file: deleteCompare ~ 409 ~ Delete compare success");
                res.status(409).json({ msg: "Delete compare error" });
            }
        }
        catch (e) {
            console.error("🚀 ~ file: deleteCompare ~ 500 ~ Error delete Compare:", e);
            res.status(500).json({ msg: "An error occurred while deleting compare" });
        }
    });
}
