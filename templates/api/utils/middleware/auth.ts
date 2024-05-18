import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
    userId: number;
    role: string;
}

interface RequestWithUser extends Request {
    user?: UserPayload;
}

const secret: string = process.env.JWT_SECRET || 'secret';

export const authenticateToken = (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {        
        const authHeader = req.headers['authorization'];
        
        const token = authHeader && authHeader.split(' ')[1];  // "Bearer TOKEN_HERE"
        
        if (!token) {
            return res.sendStatus(401);
        }

        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = decoded as UserPayload;
            next();
        });
    } catch (error) {
        console.log(error);
        next(error)
    }
};