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
exports.checkout = checkout;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
function checkout(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("🚀 ~ file: src/controler/action/checkout");
        const userId = parseInt(req.user.id, 10);
        const inforBuyer = req.body.inforBuyer;
        const { shipping, payment, coupon_id } = req.body;
        const cart = req.body.cart;
        const status = "new";
        try {
            yield prisma_1.default.$transaction((prisma) => __awaiter(this, void 0, void 0, function* () {
                const createCheckout = yield prisma.checkout.create({
                    data: {
                        user_id: userId,
                        firstName: inforBuyer.firstName,
                        lastName: inforBuyer.lastName,
                        email: inforBuyer.email,
                        address1: inforBuyer.address1,
                        address2: inforBuyer.address2,
                        country: inforBuyer.country,
                        shipping: shipping,
                        payment: payment,
                        coupon_id: coupon_id,
                        orderStatus: status,
                    },
                });
                const deleteCart = yield prisma.cart.deleteMany({
                    where: {
                        user_id: userId,
                    },
                });
                const checkout = yield prisma.product_checkout.createMany({
                    data: cart.map((e) => ({
                        product_id: e.product_id,
                        amount: e.amount,
                        checkout_id: createCheckout.id,
                    })),
                });
            }));
            console.info("🚀 ~ file: checkout ~ 200 ~ Checkout success");
            res.status(200).json({ "msg": "Checkout success" });
        }
        catch (e) {
            console.error("🚀 ~ file: addCart ~ Error checkout:", e);
            res.status(201).json({ "msg": "Checkout error" });
        }
    });
}
