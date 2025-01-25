import { z } from 'zod';
import { ModelStatus } from '@share/model/base-model';
import {
    ErrBrandIdMustBeValid,
    ErrProductNameTooShort,
    ErrPriceMustBePositive,
    ErrCategoryIdMustBeValid,
    ErrQuantityMustBePositive,
 } from './errors';

 export enum ProductGender {
    MALE = 'male',
    FEMALE = 'female',
    UNISEX = 'unisex',
 }

export const ProductSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(2, ErrProductNameTooShort),
    price: z.number().int().positive(ErrPriceMustBePositive),
    salePrice: z.number().int().positive(ErrPriceMustBePositive),
    colors: z.string().optional(),
    quantity: z.number().int().positive(ErrQuantityMustBePositive),
    brandId : z.string().uuid(ErrBrandIdMustBeValid).optional(),
    categoryId: z.string().uuid(ErrCategoryIdMustBeValid).optional(),
    content: z.string().optional(),
    description: z.string().optional(),
    rating: z.number().min(1).max(5),
    saleCount: z.number().int().positive(),
    status: z.nativeEnum(ModelStatus),
    createdAt: z.date(),
    updatedAt: z.date(),
})

export type Product = z.infer<typeof ProductSchema> & {category?: ProductCategory, brand?: ProductBrand};

export const ProductBrandSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(2, ErrProductNameTooShort)
})

export type ProductBrand = z.infer<typeof ProductBrandSchema>;  

export const ProductCategorySchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(2, ErrProductNameTooShort)
})

export type ProductCategory = z.infer<typeof ProductCategorySchema>;