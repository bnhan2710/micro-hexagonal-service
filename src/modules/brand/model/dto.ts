import z from "zod"
import { ErrBrandNameTooShort } from "./errors";

export const BrandCreateSchema = z.object({
    name: z.string().min(2, ErrBrandNameTooShort.message),
    image: z.string().optional(),
    description: z.string().optional(),
    tagLine: z.string().optional(),
});

export type BrandCreateDTO = z.infer<typeof BrandCreateSchema>;

export const BrandUpdateSchema= z.object({
    name: z.string().min(2, ErrBrandNameTooShort.message).optional(),
    image: z.string().optional(),
    description: z.string().optional(),
    tagLine: z.string().optional(),
});

export type BrandUpdateDTO = z.infer<typeof BrandUpdateSchema>;

export type BrandCondDTO = {}