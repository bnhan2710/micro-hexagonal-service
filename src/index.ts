import 'module-alias/register'

import express, { application } from 'express';
const app = express();
import dotenv from 'dotenv';
import { setupCategoryHexagon } from '@modules/category';
import { setupBrandHexagon } from '@modules/brand';
import { setupProductHexagon } from '@modules/product';
import {sequelize} from '@share/component/sequelize'
const port = process.env.PORT || 3000;
import { Request, Response, Application } from 'express';

dotenv.config();

app.use(express.json());


(async () => {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    app.use('/v1',setupCategoryHexagon(sequelize));
    app.use('/v1',setupBrandHexagon(sequelize));
    app.use('/v1',setupProductHexagon(sequelize));
    app.get('/', (req: Request, res: Response) => {
        res.send('Hello World!');
    });    
    app.listen(port, () => {
        console.log('Server is running on http://localhost:3000');
    });    
})();    

