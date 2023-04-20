"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.input = void 0;
const promises_1 = __importDefault(require("readline/promises"));
const input = async (question) => {
    const rl = promises_1.default.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    const answer = await rl.question(question ?? "");
    rl.close();
    return answer;
};
exports.input = input;
