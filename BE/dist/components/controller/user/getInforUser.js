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
exports.getInforUser = getInforUser;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
function getInforUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("🚀 ~ file: src/controler/user/getInforUser");
        const userId = parseInt(req.user.id, 10);
        try {
            const inforUser = yield prisma_1.default.users.findUnique({
                where: {
                    id: userId,
                },
                select: {
                    firstName: true,
                    lastName: true,
                    email: true,
                    phone: true,
                    address1: true,
                    address2: true,
                    country: true,
                }
            });
            console.log("🚀 ~ file: getInforUser ~ 200 ~ Get infor user success");
            res.status(200).json({ inforUser: inforUser });
        }
        catch (e) {
            console.error("Error changing password:", e);
            res.status(500).json({ msg: "An error occurred while getting infor user" });
        }
    });
}
