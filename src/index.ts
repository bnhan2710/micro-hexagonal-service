import express from 'express';
import { Request, Response, Application } from 'express';
const app = express();
import dotenv from 'dotenv';
import { setupCategoryModule } from './modules/category';
import {sequelize} from './share/component/sequelize';
const port = process.env.PORT || 3000;
dotenv.config();

app.use(express.json());


(async () => {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    app.use('/v1',setupCategoryModule(sequelize));
    app.get('/', (req: Request, res: Response) => {
        res.send('Hello World!');
    });    
    app.listen(port, () => {
        console.log('Server is running on http://localhost:3000');
    });    
})();    

