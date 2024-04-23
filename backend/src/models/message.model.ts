import mongoose from "mongoose";

export type MessageType = {
    _id: string;
    senderId: mongoose.Schema.Types.ObjectId | any;
    receiverId: mongoose.Schema.Types.ObjectId | any;
    message: string;
};

const messageSchema = new mongoose.Schema<MessageType>({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    message: {
        type: String,
        required: true
    },
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);
export default Message;