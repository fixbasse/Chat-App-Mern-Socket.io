import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectToMongoDB from './db/db';
import cookieParser from 'cookie-parser';

import authRoute from './routes/auth.route';
import messageRoute from './routes/message.route';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/api/auth', authRoute);
app.use('/api/message', messageRoute);


const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server is running at localhost: ${PORT}`);
});