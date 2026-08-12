import { User, UserRole, UserStatus } from '@prisma/client'

export type UserPublic = Pick<
  User,
  'id' | 'email' | 'firstName' | 'lastName' | 'role'
>

export type UserProfile = Pick<
  User,
  | 'id'
  | 'email'
  | 'phone'
  | 'firstName'
  | 'lastName'
  | 'role'
  | 'emailVerified'
  | 'phoneVerified'
  | 'createdAt'
>

export interface UpdateProfileInput {
  firstName?: string
  lastName?: string
  phone?: string
}

export interface CreateUserInput {
  email: string
  password: string
  firstName: string
  lastName: string
  phone?: string
  role?: UserRole
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface UserSession {
  id: string
  email: string
  firstName: string
  lastName: string
  role: UserRole
}
