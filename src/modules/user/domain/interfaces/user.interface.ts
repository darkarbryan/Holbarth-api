export interface IUser {
    id?: number;
    username: string;
    password: string;
    userStatusCode?: string;
    createdAt?: Date;
    updatedAt?: Date;
    status?: boolean;
}

export interface ICreateUser {
    username: string;
    password: string;
    userStatusCode?: string;
}

export interface IUpdateUser {
    username?: string;
    password?: string;
    userStatusCode?: string;
}