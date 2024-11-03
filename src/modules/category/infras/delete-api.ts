import { Request, Response } from 'express';
import { CategoryPersistence } from './repository/dto';
import { CategoryStatus } from '../model/model';
export async function deleteCategoryApi(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const category = await CategoryPersistence.findByPk(id);
    if(!category){
        res.status(404).json({
            message: 'Category not found',
        });
        return;
    }
    if(category.status === CategoryStatus.Deleted){
        res.status(400).json({
            message: 'Category already deleted',
        });
        return;
    }
    await CategoryPersistence.update({ status: CategoryStatus.Deleted }, { where: { id } });
    res.status(200).json({
        data: true,
    });
}