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
exports.changePassword = changePassword;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
const auth_1 = require("../../../middleware/auth");
function changePassword(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("🚀 ~ file: src/controler/user/changePassword");
        const userId = parseInt(req.user.id, 10);
        const { newPassword, oldPassword } = req.body;
        try {
            const user = yield prisma_1.default.users.findUnique({
                where: {
                    id: userId
                },
                select: {
                    password: true,
                }
            });
            if (user && (yield (0, auth_1.comparePassword)(oldPassword, user === null || user === void 0 ? void 0 : user.password))) {
                const inforUser = yield prisma_1.default.users.update({
                    where: {
                        id: userId,
                    },
                    data: {
                        password: yield (0, auth_1.createPassword)(newPassword),
                    }
                });
                console.log("🚀 ~ file: changePassword ~ 200 ~ Change Password success");
                res.status(200).json({ msg: "Change password success" });
            }
            else {
                console.log("🚀 ~ file: changePassword ~ 400 ~ Password incorrect");
                res.status(400).json({ msg: "Password incorrect" });
            }
        }
        catch (e) {
            console.error("🚀 ~ file: changePassword ~ 500 ~ Error changing password:", e);
            res.status(500).json({ msg: "An error occurred while changing the password" });
        }
    });
}
