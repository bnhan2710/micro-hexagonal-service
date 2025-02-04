import { z } from 'zod';

import {
    ErrBrandIdMustBeValid,
    ErrProductNameTooShort,
    ErrPriceMustBePositive,
    ErrCategoryIdMustBeValid,
    ErrQuantityMustBePositive,
    ErrFromPriceMustBePositive
} from './errors';

export const ProductCreateSchema = z.object({
    name: z.string().min(2, ErrProductNameTooShort),
    price: z.number().int().positive(ErrPriceMustBePositive),
    salePrice: z.number().int().positive(ErrPriceMustBePositive),
    quantity: z.number().int().positive(ErrQuantityMustBePositive),
    brandId: z.string().uuid(ErrBrandIdMustBeValid),
    categoryId: z.string().uuid(ErrCategoryIdMustBeValid),
    content: z.string().optional(),
    description: z.string().optional(),
    
})

export type ProductCreateDTO = z.infer<typeof ProductCreateSchema>;

export const ProductUpdateSchema = z.object({
    name: z.string().min(2, ErrProductNameTooShort).optional(),
    price: z.number().int().positive(ErrPriceMustBePositive).optional(),
    salePrice: z.number().int().positive(ErrPriceMustBePositive).optional(),
    quantity: z.number().int().positive(ErrQuantityMustBePositive).optional(),
    brandId: z.string().uuid(ErrBrandIdMustBeValid).optional(),
    categoryId: z.string().uuid(ErrCategoryIdMustBeValid).optional(),
    content: z.string().optional(),
    description: z.string().optional(),
})

export type ProductUpdateDTO = z.infer<typeof ProductUpdateSchema>;

export const ProductCondSchema = z.object({
    fromPrice: z.number().int().positive(ErrFromPriceMustBePositive).optional(),
    toPrice: z.number().int().positive(ErrFromPriceMustBePositive).optional(),
    brandId: z.string().uuid(ErrBrandIdMustBeValid).optional(),
    categoryId: z.string().uuid(ErrCategoryIdMustBeValid).optional(),
})

export type ProductCondDTO = z.infer<typeof ProductCondSchema>;