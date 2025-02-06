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
exports.loginGoogle = loginGoogle;
const axios_1 = __importDefault(require("axios"));
const google_auth_library_1 = require("google-auth-library");
const prisma_1 = __importDefault(require("../../../lib/prisma"));
const auth_1 = require("../../../middleware/auth");
const client = new google_auth_library_1.OAuth2Client('349673126406-n35a98jb3d0hcmdkono6biavqp0rd006.apps.googleusercontent.com');
function loginGoogle(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("🚀 ~ file: src/controler/auth/loginGoogle");
        const { token } = req.body;
        const response = yield axios_1.default.get("https://www.googleapis.com/oauth2/v1/userinfo", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const email = response.data.email + ".google";
        const password = response.data.id;
        const firstName = response.data.given_name;
        const lastName = response.data.family_name;
        const user = yield prisma_1.default.users.findUnique({
            where: {
                email: email,
            },
            select: {
                email: true,
                password: true,
                id: true,
                firstName: true,
                lastName: true,
                cart: {
                    select: {
                        product: true,
                    }
                },
                wishlist: {
                    select: {
                        product: true,
                    }
                },
                compare: {
                    select: {
                        product: true,
                    }
                }
            },
        });
        if (user) {
            const cart = user.cart.map((e) => { return e.product; });
            const compare = user.compare.map((e) => { return e.product; });
            const wishlist = user.wishlist.map((e) => { return e.product; });
            const userData = {
                firstName: user.firstName,
                lastName: user.lastName,
                cart: cart,
                wishlist: wishlist,
                compare: compare,
            };
            const token = (0, auth_1.createToken)({ email: user.email, id: user.id.toString() });
            res.status(200).json({ msg: "Login success", token: token, data: userData });
        }
        else {
            const userCreate = yield prisma_1.default.users.create({
                data: {
                    email: email,
                    password: yield (0, auth_1.createPassword)(password),
                    firstName: firstName,
                    lastName: lastName,
                },
            });
            const userData = {
                firstName: userCreate.firstName,
                lastName: userCreate.lastName,
                cart: [],
                wishlist: [],
                compare: [],
            };
            const token = (0, auth_1.createToken)({ email: userCreate.email, id: userCreate.id.toString() });
            res.status(200).json({ msg: "Login success", token: token, data: userData });
        }
    });
}
