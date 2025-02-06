"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
const connection = mysql_1.default.createConnection({
    host: 'localhost',
    port: 3306,
    database: "scart",
    user: "root",
    password: process.env.PASSWORD,
});
connection.connect(function (err) {
    if (err) {
        console.log(err);
    }
    else {
        console.log("connection created with mysql successfully");
    }
});
exports.default = connection;
