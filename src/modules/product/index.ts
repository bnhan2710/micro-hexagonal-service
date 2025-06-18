import { Router } from 'express';
import { Sequelize } from 'sequelize';
import { init, modelName } from './infras/repository/mysql/dto';
import { MySQLProductRepository } from './infras/repository/mysql/mysql-repo';
import { ProductUsecase } from './usecase';
import { ProductHttpService } from './infras/transport/http-service';
import { ProxyProductBrandRepository, RPCProductBrandRepository,RPCProductCategoryRepository } from './infras/repository/rpc';
import { config } from '@share/component/config';
import { ServiceContext } from '@share/interface/service-context';
import { UserRole } from '@share/interface';


export const setupProductHexagon = (sequelize:Sequelize, sctx: ServiceContext ) => {
    init(sequelize)

    const repository = new MySQLProductRepository(sequelize,modelName)
    // const productBrandRepository = new RPCProductBrandRepository(config.rpc.productBrand)
    const productBrandRepository = new ProxyProductBrandRepository(new RPCProductBrandRepository(config.rpc.productBrand))
    const productCategoryRepository = new RPCProductCategoryRepository(config.rpc.productCategory)

    const useCase = new ProductUsecase(
         repository,
         productBrandRepository, 
         productCategoryRepository
        )
    const httpService = new ProductHttpService(
        useCase, productBrandRepository,productCategoryRepository
    )

    const router = Router();
    const mdlFactory = sctx.mdlFactory;
    const adminChecker = mdlFactory.allowRoles([UserRole.ADMIN]);

    
    router.post('/products', mdlFactory.auth, adminChecker, httpService.createAPI.bind(httpService));
    router.get('/products', httpService.listAPI.bind(httpService));
    router.get('/products/:id', httpService.getDetailAPI.bind(httpService));
    router.patch('/products/:id', mdlFactory.auth, adminChecker, httpService.updateAPI.bind(httpService));
    router.delete('/products/:id', mdlFactory.auth, adminChecker, httpService.deleteAPI.bind(httpService));
    
    return router;
}

  