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
exports.comment = comment;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
function comment(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("🚀 ~ file: src/controler/action/comment");
        const comment = req.body;
        try {
            const createComment = yield prisma_1.default.review.create({
                data: {
                    name: comment.name,
                    content: comment.content,
                    rate: comment.rate,
                    product_id: comment.product_id,
                }
            });
            const allComment = yield prisma_1.default.review.findMany({
                where: {
                    product_id: comment.product_id
                },
                select: {
                    name: true,
                    rate: true,
                    content: true,
                    createAt: true,
                }
            });
            if (createComment) {
                console.log("🚀 ~ file: comment ~ 201 ~ add comment success");
                res.status(201).json({ msg: "Add comment success", review: allComment });
            }
            else {
                console.error("🚀 ~ file: comment ~ 409 ~ Add comment success");
                res.status(409).json({ msg: "Add comment failed" });
            }
        }
        catch (e) {
            console.error("🚀 ~ file: addCart ~ Error add comment:", e);
            res.status(500).json({ msg: "An error occurred while adding comment" });
        }
    });
}
