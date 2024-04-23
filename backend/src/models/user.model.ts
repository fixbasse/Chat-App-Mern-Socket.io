import mongoose from "mongoose";

export type UserType = {
    _id: string;
    fullName: string;
    userName: string;
    password: string;
    gender: string;
    profilePic: string;
};

const userSchema = new mongoose.Schema<UserType>({
    fullName: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, required: true, enum: ['male', 'female'] },
    profilePic: { type: String, default: '' },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;