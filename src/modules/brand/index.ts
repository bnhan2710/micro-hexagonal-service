import { Router } from 'express';
import { Sequelize } from 'sequelize';
import { init } from './infras/repository/sequelize.ts/dto';
import { MySQLBrandRepository } from './infras/repository/sequelize.ts';
import { BrandHttpService } from './infras/transport';
import { CreateNewBrandHandler } from './usecase/create-new-brand';
import { GetBrandDetailQuery } from './usecase/get-brand-detail';
import { UpdateBrandHandler } from './usecase/update-brand';
import { DeleteBrandHandler } from './usecase/delete-brand';
import { ListQueryHandler } from './usecase/list-brand';


export const setupBrandHexagon = (sequelize:Sequelize ) => {
    init(sequelize)

    const repository = new MySQLBrandRepository(sequelize)

    const createCmdHanlder = new CreateNewBrandHandler(repository)
    const getDetailQueryHandler = new GetBrandDetailQuery(repository)
    const listQueryHandler = new ListQueryHandler(repository)
    const updateCmdHandler = new UpdateBrandHandler(repository)
    const deleteCmdHandler = new DeleteBrandHandler(repository)
    const httpService = new BrandHttpService(
        createCmdHanlder,
        getDetailQueryHandler,
        listQueryHandler,
        updateCmdHandler,
        deleteCmdHandler)

    const router = Router();
    
    router.post('/brands', httpService.createAPI.bind(httpService));
    router.get('/brands', httpService.listAPI.bind(httpService));
    router.get('/brands/:id', httpService.getDetailAPI.bind(httpService));
    router.patch('/brands/:id', httpService.updateAPI.bind(httpService));
    router.delete('/brands/:id', httpService.deleteAPI.bind(httpService));

    
    return router;
}

  