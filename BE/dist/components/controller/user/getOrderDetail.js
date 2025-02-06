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
exports.getOrderDetail = getOrderDetail;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
function getOrderDetail(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("🚀 ~ file: src/controler/user/getOrderDetail");
        const checkoutId = req.query.checkoutId;
        try {
            const inforBuyer = yield prisma_1.default.checkout.findFirst({
                where: {
                    id: checkoutId,
                },
                select: {
                    firstName: true,
                    lastName: true,
                    phone: true,
                    email: true,
                    address1: true,
                    address2: true,
                    country: true,
                    orderStatus: true,
                    shipping: true,
                    payment: true,
                }
            });
            const product = yield prisma_1.default.product_checkout.findMany({
                where: {
                    checkout_id: checkoutId,
                },
                select: {
                    product: true,
                    amount: true,
                }
            });
            console.log("🚀 ~ file: getOrderDetail ~ 200 ~ Get order detail success");
            res.status(200).json({ product: product, inforBuyer: inforBuyer });
        }
        catch (e) {
            console.error("🚀 ~ file: getHistoryOrder ~ 500 ~ Error get order detail:", e);
            res.status(500).json({ msg: "An error occurred while getting order detail" });
        }
    });
}
