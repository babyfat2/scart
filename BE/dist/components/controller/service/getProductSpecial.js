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
exports.getProductSpecial = getProductSpecial;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
function getProductSpecial(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("🚀 ~ file: src/controler/auth/getProductSpecial");
        const product = yield prisma_1.default.product.findMany({
            select: {
                id: true,
                sku: true,
                name: true,
                price: true,
                status: true,
                stock: true,
                category: true,
                brand: true,
                imageUri: true,
                description: true,
                size: true,
                color: true,
                sale: true,
            },
            take: 3,
            skip: 4,
        });
        const productData = product.map((e) => {
            if (e.sale[0]) {
                const sale = e.sale[0];
                return Object.assign(Object.assign({}, e), { sale: sale });
            }
            else {
                return e;
            }
        });
        res.status(200).json({ product: productData });
    });
}
