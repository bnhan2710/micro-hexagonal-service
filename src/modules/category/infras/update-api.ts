import { Request, Response } from 'express';
import { UpdateCategorySchema } from '../model/dto';
import { CategoryPersistence } from './repository/dto';
import { CategoryStatus } from '../model/model';

export async function updateCategoryApi(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const category = await CategoryPersistence.findByPk(id);
    if(!category || category.status === CategoryStatus.Deleted){
        res.status(404).json({
            message: 'Category not found'
        });
        return;
    }

    const {success, data, error} = UpdateCategorySchema.safeParse(req.body);
    if(!success){
        res.status(400).json({
            message: error.message
        });
        return;
    }
    await CategoryPersistence.update(data, { where: { id } })
    res.status(200).json({
        data: true,
    });
}