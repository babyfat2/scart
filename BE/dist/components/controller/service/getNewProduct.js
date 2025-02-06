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
exports.getNewProduct = getNewProduct;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
function getNewProduct(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("🚀 ~ file: src/controler/auth/getNewProduct");
        const dayNow = new Date();
        try {
            const product = yield prisma_1.default.product.findMany({
                select: {
                    id: true,
                    name: true,
                    sku: true,
                    price: true,
                    stock: true,
                    status: true,
                    brand: true,
                    imageUri: true,
                    description: true,
                    sale: {
                        where: {
                            endAt: {
                                gt: dayNow,
                            }
                        }
                    },
                    color: true,
                    group: true,
                    size: true,
                },
                orderBy: {
                    createAt: 'desc', // giảm dần
                },
                take: 12,
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
            console.log("🚀 ~ file: getNewproduct ~ 200 ~ Send product data");
            res.status(200).json(productData);
        }
        catch (e) {
            console.log("🚀 ~ file: getNewproduct ~ 401 ~ Error get new product");
            res.status(401).json({ "msg": "Error get new product" });
        }
    });
}
