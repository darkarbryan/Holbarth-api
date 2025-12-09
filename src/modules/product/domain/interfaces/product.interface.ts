export interface IProduct {
  id?: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  productCategory?: any;
  creatorId?: number;
  createdAt?: Date;
  updatedAt?: Date;
  status?: boolean;
}

export interface ICreateProduct {
  name: string;
  description: string;
  price: number;
  stock: number;
  productCategoryId?: number;
  creatorId: number;
}

export interface IUpdateProduct {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  productCategoryId?: number;
}
