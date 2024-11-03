import { Request, Response } from 'express';
import { Category, CategoryStatus } from '../model/model';
import {v7} from 'uuid'
import { CreateCategoryDTO, CreateCategorySchema } from '../model/dto';
import { CategoryPersistence } from './repository/dto';

export async function createCategoryApi(req: Request, res: Response) {

    const { success , data , error} = CreateCategorySchema.safeParse(req.body);
    if(!success){
        res.status(400).json({
            message: error.message
        })
        return;
    }
    const newId = v7(); 
    await CategoryPersistence.create({id:newId,...data})

    res.status(200).json({
        data: newId
    })  
}


