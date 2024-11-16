import { Router } from 'express';
import { Sequelize } from 'sequelize';
import { init } from './infras/repository/sequelize.ts/dto';
import { MySQLBrandRepository } from './infras/repository/sequelize.ts';
import { BrandUseCase } from './usecase';
import { BrandHttpService } from './infras/transport';


export const setupBrandHexagon = (sequelize:Sequelize ) => {
    init(sequelize)

    const repository = new MySQLBrandRepository(sequelize)
    const useCase = new BrandUseCase(repository)
    const httpService = new BrandHttpService(useCase)

    const router = Router();
    
    router.post('/brands', httpService.createAPI.bind(httpService));
    router.get('/brands', httpService.listAPI.bind(httpService));
    router.get('/brands/:id', httpService.getDetailAPI.bind(httpService));
    router.patch('/brands/:id', httpService.updateAPI.bind(httpService));
    router.delete('/brands/:id', httpService.deleteAPI.bind(httpService));

    return router;
}

  