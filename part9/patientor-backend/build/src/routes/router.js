"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const appService_1 = __importDefault(require("../services/appService"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send(appService_1.default.getDiagonse);
});
router.post('/', (_req, res) => {
    res.send('Saving!');
});
exports.default = router;
