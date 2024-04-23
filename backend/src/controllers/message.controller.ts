import { Request, Response } from "express"
import Conversation from "../models/conversation.model";
import Message from "../models/message.model";

export const sendMessage = async (req: Request, res: Response) => {
    try {
        // userId locate at route file and userId came from middleware token.
        const { message } = req.body;
        const senderId = req.userId;
        const { userId: receiverId } = req.params;

        // * Check existing message
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            })
        };

        // * If no message, create one.
        const newMessage = new Message({
            senderId,
            receiverId,
            message
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        };

        // * SOCKET IO WILL LOCATE HERE

        // await conversation.save(); this run first
        // await newMessage.save();
        Promise.all([conversation.save(), newMessage.save()]); // this will run both

        res.status(201).json(newMessage);
    } catch (error: any) {
        console.log(error.message);
        res.status(500).send('Internal Error at [send-message]');
    }
};

export const getMessages = async (req: Request, res: Response) => {
    try {
        const { userId: userToChatId } = req.params;
        const senderId = req.userId;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] }
        }).populate('messages');

        res.status(200).json(conversation?.messages);

    } catch (error: any) {
        console.log(error.sendMessage);
        res.status(500).send('Internal Error at [get-message]');
    }
};