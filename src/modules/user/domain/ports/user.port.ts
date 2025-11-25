import { IUser, ICreateUser, IUpdateUser } from '../interfaces';

/**
 * Abstract class representing a UserPort with methods for user CRUD operations.
 */
export abstract class UserPort {
    abstract create(userData: ICreateUser): Promise<IUser>;
    abstract findAll(): Promise<IUser[]>;
    abstract findById(id: number): Promise<IUser | null>;
    abstract findByUsername(username: string): Promise<IUser | null>;
    abstract update(id: number, userData: IUpdateUser): Promise<IUser | null>;
    abstract delete(id: number): Promise<boolean>;
}
