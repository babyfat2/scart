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
exports.addCompare = addCompare;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
function addCompare(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("🚀 ~ file: src/controler/action/addCompare");
        const userId = parseInt(req.user.id, 10);
        const productId = req.body.productId;
        try {
            const createCompare = yield prisma_1.default.compare.create({
                data: {
                    user_id: userId,
                    product_id: productId,
                }
            });
            if (createCompare) {
                console.info("🚀 ~ file: addCompare ~ 201 ~ Add commpare success");
                res.status(201).json({ msg: "Add compare success" });
            }
            else {
                console.error("🚀 ~ file: addCompare ~ 200 ~ Add compare error");
                res.status(200).json({ msg: "Add compare error" });
            }
        }
        catch (e) {
            console.error("🚀 ~ file: addCompare ~ Error add Compare:", e);
            res.status(500).json({ msg: "An error occurred while adding compare" });
        }
    });
}
