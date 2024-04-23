import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express'

declare global {
    namespace Express {
        interface Request {
            userId: string;
        }
    }
};

const protectRoute = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies['jwt'];
        if (!token) return res.status(401).send('Unauthorized');

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        if (!decoded) return res.status(401).send('Invalid Token');

        req.userId = (decoded as JwtPayload).userId;
        // const user = await User.findById(decoded.userId as JwtPayload);

        next();
    } catch (error: any) {
        console.log(error.message);
        res.status(500).send('Internal Error at [middleware]');
    }
};

export default protectRoute;