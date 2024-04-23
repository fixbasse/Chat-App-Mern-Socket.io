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
exports.getMessages = exports.sendMessage = void 0;
const conversation_model_1 = __importDefault(require("../models/conversation.model"));
const message_model_1 = __importDefault(require("../models/message.model"));
const sendMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // userId locate at route file and userId came from middleware token.
        const { message } = req.body;
        const senderId = req.userId;
        const { userId: receiverId } = req.params;
        // * Check existing message
        let conversation = yield conversation_model_1.default.findOne({
            participants: { $all: [senderId, receiverId] },
        });
        if (!conversation) {
            conversation = yield conversation_model_1.default.create({
                participants: [senderId, receiverId],
            });
        }
        ;
        // * If no message, create one.
        const newMessage = new message_model_1.default({
            senderId,
            receiverId,
            message
        });
        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }
        ;
        // * SOCKET IO WILL LOCATE HERE
        // await conversation.save(); this run first
        // await newMessage.save();
        Promise.all([conversation.save(), newMessage.save()]); // this will run both
        res.status(201).json(newMessage);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Error at [send-message]');
    }
});
exports.sendMessage = sendMessage;
const getMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId: userToChatId } = req.params;
        const senderId = req.userId;
        const conversation = yield conversation_model_1.default.findOne({
            participants: { $all: [senderId, userToChatId] }
        }).populate('messages');
        res.status(200).json(conversation === null || conversation === void 0 ? void 0 : conversation.messages);
    }
    catch (error) {
        console.log(error.sendMessage);
        res.status(500).send('Internal Error at [get-message]');
    }
});
exports.getMessages = getMessages;
