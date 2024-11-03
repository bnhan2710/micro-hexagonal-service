import { Request, Response } from "express"
import { CategoryPersistence } from "./repository/dto"
import { z } from "zod";


const PagingDTOSchema = z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(10),
    total : z.number().int().min(0).default(0).optional()
});

type PagingDTO = z.infer<typeof PagingDTOSchema>;

export async function listCategoryApi(req: Request, res: Response): Promise<void> {
    const { success, data, error } = PagingDTOSchema.safeParse(req.query);
    if (!success) {
        res.status(400).json({
            message: error.message
        });
        return;
    }
    const { page, limit } = data;
    const offset = (page - 1) * limit;
    const {rows, count} = await CategoryPersistence.findAndCountAll({
        limit,
        offset
    });

    data.total = count;

    res.status(200).json({
        data: rows,
        paging: data
    });

}