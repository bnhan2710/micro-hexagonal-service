import { z } from "zod";
enum CategoryStatus {
    Active = 'active',
    Inactive = 'inactive',
    Deleted = 'deleted',
}
export const CreateCategorySchema = z.object({
    name: z.string().min(3, 'name must be at least 3 characters'),
    image: z.string().optional(),
    description: z.string().optional(),
    parentId: z.string().uuid().optional(),
});

export type CreateCategoryDTO = z.infer<typeof CreateCategorySchema>;

export const UpdateCategorySchema = z.object({
    name: z.string().min(3, 'name must be at least 3 characters').optional(),
    image: z.string().optional(),
    description: z.string().optional(),
    parentId: z.string().uuid().optional(),
    status: z.nativeEnum(CategoryStatus).optional(),
});

export type UpdateCategoryDTO = z.infer<typeof UpdateCategorySchema>;