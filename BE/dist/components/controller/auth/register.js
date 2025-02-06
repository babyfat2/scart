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
exports.register = register;
const auth_1 = require("../../../middleware/auth");
const prisma_1 = __importDefault(require("../../../lib/prisma"));
function register(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("🚀 ~ file: src/controler/auth/register");
        const { email, password, firstName, lastName, phone, address1, address2, country, } = req.body;
        const user = yield prisma_1.default.users.findUnique({
            where: {
                email: email,
            },
        });
        if (user) {
            res.status(200).json({ msg: "Email already exists" });
        }
        else {
            const createUser = yield prisma_1.default.users.create({
                data: {
                    email: email,
                    password: yield (0, auth_1.createPassword)(password),
                    firstName: firstName,
                    lastName: lastName,
                    phone: phone,
                    address1: address1,
                    address2: address2,
                    country: country,
                }
            });
            if (createUser) {
                res.status(200).json({ msg: "Create account success" });
            }
        }
    });
}
