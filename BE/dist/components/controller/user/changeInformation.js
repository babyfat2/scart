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
exports.changeInformation = changeInformation;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
function changeInformation(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("🚀 ~ file: src/controler/user/changeInformation");
        const userId = parseInt(req.user.id, 10);
        const userInfor = req.body;
        try {
            const inforUser = yield prisma_1.default.users.update({
                where: {
                    id: userId,
                },
                data: {
                    firstName: userInfor.firstName,
                    lastName: userInfor.lastName,
                    phone: userInfor.phone,
                    address1: userInfor.address1,
                    address2: userInfor.address2,
                    country: userInfor.country,
                }
            });
            console.log("🚀 ~ file: changeInformation ~ 200 ~ ChangeInformation success");
            res.status(200).json({ msg: "Change information success", inforUser: inforUser });
        }
        catch (e) {
            console.error("Error changing information:", e);
            res.status(500).json({ msg: "An error occurred while changing information" });
        }
    });
}
