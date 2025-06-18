import { Handler, NextFunction, Request, Response } from "express";
import { ITokenIntrospect, Requester } from "../interface";

export function authMiddleware(
    introspector: ITokenIntrospect,
) : Handler {
    return async (req: Request, res: Response, next: NextFunction) => {
        try{
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                 res.status(401).json({ error: 'Unauthorized' });
                 return;
            }

            const { payload, error, isOk } = await introspector.instropect(token);

            if(!isOk || !payload) {
                 res.status(401).json({ error: error?.message || 'Unauthorized' });
                 return;
            }

            const requester = payload as Requester;

            res.locals['requester'] = requester;
            next();

        }
        catch (err) {
            res.status(401).json({ error: 'Unauthorized' });
             return;
        }
    }
}