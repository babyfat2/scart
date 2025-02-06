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
exports.addContactUs = addContactUs;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
function addContactUs(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("🚀 ~ file: src/controler/service/addContactUs");
        const { name, email, phone, subject, content, } = req.body;
        try {
            const addContactUs = yield prisma_1.default.contact.create({
                data: {
                    name: name,
                    email: email,
                    phone: phone,
                    subject: subject,
                    content: content,
                }
            });
            console.log("🚀 ~ file: addContactUs ~ 200 ~ Add contact success");
            res.status(200).json({ "msg": "Add contact success" });
        }
        catch (e) {
            console.log("🚀 ~ file: addContactus ~ 401 ~ Error add contact" + e);
            res.status(401).json({ "msg": "Error add contact" });
        }
    });
}
