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
exports.updateProduct = updateProduct;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
function updateProduct(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("🚀 ~ file: src/controler/auth/updateProduct");
        const product_id = parseInt(req.query.id, 10);
        const dayNow = new Date();
        const productaa = yield prisma_1.default.product.findFirst({
            where: {
                id: product_id,
            },
            select: {
                name: true,
            }
        });
        function formatString(input) {
            if (typeof input !== "string") {
                throw new Error("Input must be a string");
            }
            // Chuyển thành chữ hoa và thay khoảng trắng bằng dấu "-"
            return input.toUpperCase().replace(/\s+/g, "-");
        }
        const sku = formatString(productaa === null || productaa === void 0 ? void 0 : productaa.name);
        const product = yield prisma_1.default.product.update({
            where: {
                id: product_id,
            },
            data: {
                sku: sku,
                createAt: dayNow,
            }
        });
        res.status(200).json(product);
    });
}
