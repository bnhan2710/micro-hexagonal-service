import { Router } from 'express';
import { init, modelName } from './infras/repository/dto';
import { Sequelize } from 'sequelize';
import { MySQLCategoryRepository } from './infras/repository/repo';
import { CategoryHttpService } from './infras/transport/http-service';
import { CategoryUseCase } from './usecase';
import { ServiceContext } from '@share/interface/service-context';
import { UserRole } from '@share/interface';

export const setupCategoryHexagon = (sequelize:Sequelize, sctx: ServiceContext ) => {
    init(sequelize)

    const repository = new MySQLCategoryRepository(sequelize,modelName)
    const useCase = new CategoryUseCase(repository)
    const httpService = new CategoryHttpService(useCase)
    const router = Router();
    
    const mdlFactory = sctx.mdlFactory;
    const adminChecker = mdlFactory.allowRoles([UserRole.ADMIN]);

    router.post('/categories', mdlFactory.auth, adminChecker, httpService.createANewCategoryAPI.bind(httpService));
    router.get('/categories', httpService.listCategoryAPI.bind(httpService));
    router.get('/categories/:id', httpService.getDetailCategoryAPI.bind(httpService));
    router.patch('/categories/:id',mdlFactory.auth, adminChecker, httpService.updateCategoryAPI.bind(httpService));
    router.delete('/categories/:id',mdlFactory.auth, adminChecker, httpService.deleteCategoryAPI.bind(httpService));

    return router;
}

  