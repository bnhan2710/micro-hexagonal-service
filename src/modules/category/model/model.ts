import { z } from 'zod';
import { ModelStatus } from '../../../share/model/base-model';

//Business model
export const CategorySchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    image: z.string().optional(),
    description: z.string().nullable().optional(),
    position: z.number().min(0,'invalid position').optional().default(0),
    parentId: z.string().uuid().nullable().optional(),
    status: z.nativeEnum(ModelStatus),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export type Category = z.infer<typeof CategorySchema>;
