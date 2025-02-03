import { Router } from 'express';
import { Sequelize } from 'sequelize';
import { init, modelName } from './infras/repository/mysql/dto';
import { MySQLProductRepository } from './infras/repository/mysql/mysql-repo';
import { ProductUsecase } from './usecase';
import { ProductHttpService } from './infras/transport/http-service';
import { ProxyProductBrandRepository, RPCProductBrandRepository } from './infras/repository/rpc';
import { config } from '@share/component/config';


export const setupProductHexagon = (sequelize:Sequelize ) => {
    init(sequelize)

    const repository = new MySQLProductRepository(sequelize,modelName)
    // const productBrandRepository = new RPCProductBrandRepository(config.rpc.productBrand)
    const productBrandRepository = new ProxyProductBrandRepository(new RPCProductBrandRepository(config.rpc.productBrand))
    const productCategoryRepository = new RPCProductBrandRepository(config.rpc.productCategory)

    const useCase = new ProductUsecase(
         repository,
         productBrandRepository, 
         productCategoryRepository
        )
    const httpService = new ProductHttpService(
        useCase, productBrandRepository,productCategoryRepository
    )

    const router = Router();
    
    router.post('/products', httpService.createAPI.bind(httpService));
    router.get('/products', httpService.listAPI.bind(httpService));
    router.get('/products/:id', httpService.getDetailAPI.bind(httpService));
    router.patch('/products/:id', httpService.updateAPI.bind(httpService));
    router.delete('/products/:id', httpService.deleteAPI.bind(httpService));
    
    return router;
}

  