import ProductModel from '../models/ProductModelMongo';
import { IProduct, IProductPrototype, IProductController } from '../interfaces/ProductInterface';
import { HttpCode } from '../helpers/HttpCodes';
import ResponseOperation from '../helpers/ResponseOperation';
import { isNullOrUndefined } from 'util';

export default class ProductControllerMongo implements IProductController {
    public async createProduct(product: IProductPrototype): Promise<ResponseOperation<IProduct>>{
        const recordedProduct: IProduct = new ProductModel(product);
        return recordedProduct.save()
            .then((newProduct: IProduct) => {
                return Promise.resolve(
                    new ResponseOperation<IProduct>(true, HttpCode.CREATED, newProduct)
                );
            }).catch((err) => {
                return Promise.reject(
                    new ResponseOperation<IProduct>(false, HttpCode.INTERNAL_ERROR, null, err)
                );
            });
    }

    public async getProducts(): Promise<ResponseOperation<IProduct[]>>{
        return ProductModel.find().exec()
            .then((products: IProduct[]) => {
                return Promise.resolve(
                    new ResponseOperation<IProduct[]>(true, HttpCode.OK, products)
                );
            })
            .catch((err) => {
                return Promise.reject(
                    new ResponseOperation<IProduct[]>(false, HttpCode.INTERNAL_ERROR, null, err)
                );
            });
    }

    public async getProductById(id: IProduct['_id']): Promise<ResponseOperation<IProduct>>{
        return ProductModel.findById({ _id: id }).exec()
            .then((product: IProduct) => {
                return Promise.resolve(
                    new ResponseOperation<IProduct>(true, HttpCode.OK, product)
                );
            })
            .catch((err) => {
                return Promise.reject(
                    new ResponseOperation<IProduct>(false, HttpCode.INTERNAL_ERROR, null, err)
                );
            });
    }

    public async updateProduct(product: IProductPrototype): Promise<ResponseOperation<IProduct>>{
        return ProductModel.findById(product._id).exec()
            .then((foundProduct: IProduct) => {
                if (isNullOrUndefined(foundProduct)) {
                    const errorMessage = 'Product does not exists';
                    return Promise.reject(
                        new ResponseOperation<IProduct>(false, HttpCode.INTERNAL_ERROR, null, { error: errorMessage }
                        )
                    );
                }
                const { _id } = foundProduct;
                return ProductModel.findOneAndUpdate({ _id }, product, { new:true, runValidators: true }).exec()
                    .then((newProduct: IProduct) => {
                        return Promise.resolve(
                            new ResponseOperation<IProduct>(true, HttpCode.OK, newProduct)
                        );
                    })
            })
            .catch((err) => {
                return Promise.reject(
                    new ResponseOperation<IProduct>(false, HttpCode.INTERNAL_ERROR, null, err)
                );
            });
    }

    public async activateProductById(id: IProduct['_id']): Promise<ResponseOperation<IProduct>>{
        return ProductModel.findById({ _id: id }).exec()
            .then((foundProduct: IProduct) => {
                if (isNullOrUndefined(foundProduct)) {
                    const errorMessage = 'Product does not exists';
                    return Promise.reject(
                        new ResponseOperation<IProduct>(false, HttpCode.INTERNAL_ERROR, null, { error: errorMessage }
                        )
                    );
                }
                const { _id } = foundProduct;
                return ProductModel.findOneAndUpdate({ _id }, { status: true }, { new:true }).exec()
                    .then((newProduct: IProduct) => {
                        return Promise.resolve(
                            new ResponseOperation<IProduct>(true, HttpCode.OK, newProduct)
                        );
                    })
            })
            .catch((err) => {
                return Promise.reject(
                    new ResponseOperation<IProduct>(false, HttpCode.INTERNAL_ERROR, null, err)
                );
            });
    }

    public async inactiveProductById(id: IProduct['_id']): Promise<ResponseOperation<IProduct>>{
        return ProductModel.findById({ _id: id }).exec()
            .then((foundProduct: IProduct) => {
                if (isNullOrUndefined(foundProduct)) {
                    const errorMessage = 'Product does not exists';
                    return Promise.reject(
                        new ResponseOperation<IProduct>(false, HttpCode.INTERNAL_ERROR, null, { error: errorMessage }
                        )
                    );
                }
                const { _id } = foundProduct;
                return ProductModel.findOneAndUpdate({ _id }, { status: false }, { new:true }).exec()
                    .then((newProduct: IProduct) => {
                        return Promise.resolve(
                            new ResponseOperation<IProduct>(true, HttpCode.OK, newProduct)
                        );
                    })
            })
            .catch((err) => {
                return Promise.reject(
                    new ResponseOperation<IProduct>(false, HttpCode.INTERNAL_ERROR, null, err)
                );
            });
    }

    public async deleteProductById(id: IProduct['_id']): Promise<ResponseOperation<IProduct>>{
        return ProductModel.findById({ _id: id }).exec()
            .then((foundProduct: IProduct) => {
                if (isNullOrUndefined(foundProduct)) {
                    const errorMessage = 'Product does not exists';
                    return Promise.reject(
                        new ResponseOperation<IProduct>(false, HttpCode.INTERNAL_ERROR, null, { error: errorMessage }
                        )
                    );
                }
                const { _id } = foundProduct;
                return ProductModel.remove({ _id }).exec()
                    .then(() => {
                        return Promise.resolve(
                            new ResponseOperation<IProduct>(true, HttpCode.OK, foundProduct)
                        );
                    })
            })
            .catch((err) => {
                return Promise.reject(
                    new ResponseOperation<IProduct>(false, HttpCode.INTERNAL_ERROR, null, err)
                );
            });
    }
}
