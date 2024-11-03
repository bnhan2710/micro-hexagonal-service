import { Request, Response } from 'express';
import { CategoryPersistence } from './repository/dto';
export async function getCategoryApi (req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    
    const category = await CategoryPersistence.findByPk(id);
    if(!category){
        res.status(404).json({
            message: 'Category not found',
        });
        return;
    }

    res.status(200).json({
        data: category,
    });
}