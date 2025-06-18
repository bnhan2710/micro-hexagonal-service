import { z } from 'zod';
import { 
    ErrBirthdayInvalid,
    ErrFirstNameAtLeast2Characters,
    ErrGenderInvalid,
    ErrEmailInvalid,
    ErrLastNameAtLeast2Characters,
    ErrPasswordAtLeast6Chars,
    ErrRoleInvalid,
    ErrStatusInvalid,
} from './errorr';

import { UserRole } from '@share/interface';

export enum  Gender {
    MALE  = 'male',
    FEMALE = 'female',
    UNKNOWN = 'unknown'
}

export enum Status {
    ACTIVE = 'active',
    PENDING = 'pending',
    INACTIVE = 'inactive',
    BANNED = 'banned',
    DELETED = 'deleted'
}

export const userSchema = z.object({
    id: z.string().uuid(),
    avatar: z.string().nullable().optional(),
    firstName: z.string().min(2, ErrFirstNameAtLeast2Characters.message),
    lastName: z.string().min(2, ErrLastNameAtLeast2Characters.message),
    email: z.string().email(ErrEmailInvalid.message),
    password: z.string().min(6, ErrPasswordAtLeast6Chars.message),
    salt: z.string().min(8),
    phone: z.string().nullable().optional(),
    address: z.string().nullable().optional(),
    birthday: z.date({invalid_type_error: ErrBirthdayInvalid.message}).nullable().optional(),
    gender: z.nativeEnum(Gender, ErrGenderInvalid),
    role: z.nativeEnum(UserRole, ErrRoleInvalid),
    status: z.nativeEnum(Status, ErrStatusInvalid).optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional()
});

export type User = z.infer<typeof userSchema>;

export const UserRegistrationDTOSchema = userSchema.pick({
    firstName: true,
    lastName: true,
    email: true,
    password: true,
});

export const UserLoginDTOSchema = userSchema.pick({
    email: true,
    password: true
});

export type UserRegistrationDTO = z.infer<typeof UserRegistrationDTOSchema>;
export type UserLoginDTO = z.infer<typeof UserLoginDTOSchema>;

export const userUpdateDTOSchema = z.object({
    avatar: z.string().nullable().optional(),
    firstName: z.string().min(2, ErrFirstNameAtLeast2Characters).optional(),
    lastName: z.string().min(2, ErrLastNameAtLeast2Characters).optional(),
    password: z.string().min(6, ErrPasswordAtLeast6Chars).optional(),
    email: z.string().email(ErrEmailInvalid).optional(),
    salt: z.string().min(8).optional(),
    phone: z.string().nullable().optional(),
    address: z.string().nullable().optional(),
    birthday: z.date({invalid_type_error: ErrBirthdayInvalid.message}).nullable().optional(),
    gender: z.nativeEnum(Gender, ErrGenderInvalid).optional(),
    role: z.nativeEnum(UserRole, ErrRoleInvalid).optional(),
    status: z.nativeEnum(Status).optional(),
});

export type UserUpdateDTO = z.infer<typeof userUpdateDTOSchema>;

export const userCondDTOSchema = z.object({
    firstName: z.string().min(2, ErrFirstNameAtLeast2Characters).optional(),
    lastName: z.string().min(2, ErrLastNameAtLeast2Characters).optional(),
    email: z.string().email(ErrEmailInvalid).optional(),
    phone: z.string().nullable().optional(),
    address: z.string().nullable().optional(),
    gender: z.nativeEnum(Gender, ErrGenderInvalid).optional(),
    role: z.nativeEnum(UserRole, ErrRoleInvalid).optional(),
    status: z.nativeEnum(Status).optional()
});

export type UserCondDTO = z.infer<typeof userCondDTOSchema>;


