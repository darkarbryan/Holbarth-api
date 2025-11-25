export interface IProductCategory {
    id?: number;
    name: string;
    description?: string;
    products?: any[];
    createdAt?: Date;
    updatedAt?: Date;
    status?: boolean;
}

export interface ICreateProductCategory {
    name: string;
    description?: string;
}

export interface IUpdateProductCategory {
    name?: string;
    description?: string;
}
