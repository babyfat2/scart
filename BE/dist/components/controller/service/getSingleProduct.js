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
exports.getSingleProduct = getSingleProduct;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
function getSingleProduct(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("🚀 ~ file: src/controler/auth/getSingleProduct");
        const product_id = req.query.id;
        const dayNow = new Date();
        try {
            const product = yield prisma_1.default.product.findUnique({
                where: {
                    id: product_id,
                },
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
                    sale: {
                        where: {
                            endAt: {
                                gt: dayNow,
                            }
                        }
                    },
                    group: true,
                    review: true,
                }
            });
            if (product) {
                var sale;
                var group;
                if (product.sale) {
                    sale = product.sale[0];
                }
                if (product.group) {
                    group = product.group[0];
                }
                const productSingleData = {
                    id: product.id,
                    name: product.name,
                    sku: product.sku,
                    price: product.price,
                    status: product.status,
                    stock: product.stock,
                    category: product.category,
                    brand: product.brand,
                    imageUri: product.imageUri,
                    description: product.description,
                    size: product.size,
                    color: product.color,
                    group: group,
                    sale: sale,
                    review: product.review,
                };
                /*
                Lấy các sản phẩm có `brand` hoặc `category` liên quan
                */
                const productRecommend = yield prisma_1.default.product.findMany({
                    where: {
                        OR: [
                            {
                                brand: product === null || product === void 0 ? void 0 : product.brand
                            },
                            {
                                category: product === null || product === void 0 ? void 0 : product.category
                            }
                        ],
                        NOT: {
                            id: product === null || product === void 0 ? void 0 : product.id
                        } // không lấy sản phần trùng id với sản phẩm trên
                    },
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
                        sale: true,
                    },
                    take: 3,
                });
                res.status(200).json({ singleProduct: productSingleData, recommend: productRecommend });
            }
        }
        catch (e) {
            console.log("🚀 ~ file: getSingleproduct ~ Error :" + e);
        }
    });
}
