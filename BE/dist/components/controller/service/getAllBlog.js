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
exports.getAllBlog = getAllBlog;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
function getAllBlog(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("🚀 ~ file: src/controler/auth/getAllBlog");
        try {
            const allBlog = yield prisma_1.default.blog.findMany({});
            console.log("🚀 ~ file: getAllBlog ~ 200 ~ Send product data");
            res.status(200).json(allBlog);
        }
        catch (e) {
            console.log("🚀 ~ file: getAllBlog ~ 401 ~ Error get new product");
            res.status(401).json({ "msg": "Error get all blog" });
        }
    });
}
