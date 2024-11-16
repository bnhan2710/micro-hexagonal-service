import { z } from 'zod';
import { ModelStatus } from '../../../share/model/base-model';

export const modelName = "brand";

//Business model
export const BrandSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(2),
    image: z.string().optional(),
    description: z.string().nullable().optional(),
    tagLine: z.string().nullable().optional(),
    status: z.nativeEnum(ModelStatus),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export type Brand = z.infer<typeof BrandSchema>;
