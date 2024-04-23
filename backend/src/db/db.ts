import mongoose from 'mongoose'

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL as string);
        console.log('Connect to db.');

    } catch (error) {
        console.log('Error connect to db.');
    }
};

export default connectToMongoDB;
