import 'module-alias/register'
import express, { application, NextFunction, response } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { setupCategoryHexagon } from '@modules/category';
import { setupBrandHexagon } from '@modules/brand';
import { setupProductHexagon } from '@modules/product';
import { setupUserHexagon } from '@modules/user';
import {sequelize} from '@share/component/sequelize'
import { Request, Response, Application } from 'express';
import { TokenIntrospectRPCClient } from './share/repository/verify-token-rpc';
import { authMiddleware } from './share/middleware/auth';
import { allowRoles } from './share/middleware/check-role';
import { Requester, UserRole } from './share/interface';
import { setupMiddleware } from './share/middleware';
import { responseErr } from '@share/app-error';


(async () => {
    const port = process.env.PORT || 8000;
    const app = express();
    dotenv.config();  
    app.use(express.json());
    app.use(morgan('dev'));

    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    

    const introspector = new TokenIntrospectRPCClient(process.env.VERIFY_TOKEN_RPC_URL || 'http://localhost:8000/v1/rpc');

    const authMdl = authMiddleware(introspector);

    app.use('/v1/protected', authMdl, allowRoles([UserRole.ADMIN]) , (req: Request, res: Response) => {
        const requester = res.locals.requester as Requester;
        res.status(200).json({
            message: 'Protected route accessed successfully',
            requester
        });
    });

    const sctx = {
        mdlFactory : setupMiddleware(introspector),
    };

    app.get('/', (req: Request, res: Response) => {
        res.send('Hello World!');
    });  

    app.use('/v1',setupCategoryHexagon(sequelize, sctx));
    app.use('/v1',setupBrandHexagon(sequelize, sctx));
    app.use('/v1',setupProductHexagon(sequelize, sctx));
    app.use('/v1' ,setupUserHexagon(sequelize,sctx));
 
    
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        responseErr(err, res);
    });


    app.listen(port, () => {
        console.log('Server is running on http://localhost:8000');
    });    
})();    

