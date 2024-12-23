import { Router } from 'express';
import { Sequelize } from 'sequelize';
import { init, modelName } from './infras/repository/mysql/dto';
import { MySQLProductRepository } from './infras/repository/mysql/mysql-repo';
import { ProductUsecase } from './usecase';
import { ProductHttpService } from './infras/transport/http-service';


export const setupproductHexagon = (sequelize:Sequelize ) => {
    init(sequelize)

    const repository = new MySQLProductRepository(sequelize,modelName)
    const useCase = new ProductUsecase(repository)
    const httpService = new ProductHttpService(useCase)
    const router = Router();
    
    router.post('/products', httpService.createAPI.bind(httpService));
    router.get('/products', httpService.listAPI.bind(httpService));
    router.get('/products/:id', httpService.getDetailAPI.bind(httpService));
    router.patch('/products/:id', httpService.updateAPI.bind(httpService));
    router.delete('/products/:id', httpService.deleteAPI.bind(httpService));
    

    return router;
}

  