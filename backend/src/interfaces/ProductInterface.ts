import ResponseOperation from '../helpers/ResponseOperation';
import mongoose, { Document } from 'mongoose';
/**
 *
 */
export interface IProduct extends Document {
    name: string;
    description: string;
    metricPrice: number;
    image?: string;
    quantity: number;
    metric: string;
    tags?: string[];
    publisher: string;
    status?: boolean;
}


/**
 *
 */
export interface IProductPrototype {
    _id?: IProduct['_id'];
    name?: string;
    description?: string;
    metricPrice?: number;
    image?: string;
    quantity?: number;
    metric?: string;
    tags?: string[];
    publisher?: string;
    status?: boolean;
}

/**
 *
 */
export interface IProductController {
    createProduct(product: IProductPrototype): Promise<ResponseOperation<IProduct>>;
    getProducts(limit: number, page: number): Promise<ResponseOperation<{result: IProduct[], total: number}>>;
    getMyProducts(limit: number, page: number, user: string): Promise<ResponseOperation<{result: IProduct[], total: number}>>;
    getProductById(id: IProduct['_id']): Promise<ResponseOperation<IProduct>>;
    updateProduct(product: IProductPrototype): Promise<ResponseOperation<IProduct>>;
    activateProductById(id: IProduct['_id']): Promise<ResponseOperation<IProduct>>;
    inactiveProductById(id: IProduct['_id']): Promise<ResponseOperation<IProduct>>;
    deleteProductById(id: IProduct['_id']): Promise<ResponseOperation<IProduct>>;
}
