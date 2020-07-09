import { Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import config from '../config';

export const authenticateJWT = (req: any, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        verify(token, config.jwtToken, (err: any, user: any) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }

    next();
};
