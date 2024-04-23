"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const message_controller_1 = require("../controllers/message.controller");
const middleware_1 = __importDefault(require("../middleware/middleware"));
const router = express_1.default.Router();
// userId will use at controller, need to match
router.post('/send/:userId', middleware_1.default, message_controller_1.sendMessage);
router.get('/:userId', middleware_1.default, message_controller_1.getMessages);
exports.default = router;
