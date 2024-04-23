import mongoose from "mongoose";

export type ConversationType = {
    _id: string;
    participants: mongoose.Schema.Types.ObjectId;
    messages: mongoose.Schema.Types.ObjectId | any;
};

const conversationSchema = new mongoose.Schema<ConversationType>({
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message',
            default: [],
        }
    ]
}, { timestamps: true });

const Conversation = mongoose.model('Conversation', conversationSchema);
export default Conversation;