import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

const generateToken = async (userId: string, res: Response) => {
    const token = jwt.sign({
        userId
    },
        process.env.JWT_SECRET as string,
        {
            expiresIn: '1d'
        }
    );

    res.cookie('jwt', token, {
        maxAge: 86400000,
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV !== 'development'
    })
};

export default generateToken;