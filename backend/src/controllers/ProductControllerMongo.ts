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

    public async getProducts(limit: number, page: number): Promise<ResponseOperation<{result: IProduct[], total: number}>>{
        const skip: number = (page-1)*limit;
        const promise1 = ProductModel.find({ status: true }, {}, { limit, skip})
            .populate({ path: 'publisher', select: ['company', 'email', 'nickname', 'status']}).exec();
        const promise2 = ProductModel.countDocuments({ status: true }).exec()
        return Promise.all([promise1, promise2])
            .then(([result, total]) => {
                return Promise.resolve(
                    new ResponseOperation<{result: IProduct[], total: number}>(true, HttpCode.OK, {result, total})
                );
            })
            .catch((err) => {
                return Promise.reject(
                    new ResponseOperation<{result: IProduct[], total: number}>(false, HttpCode.INTERNAL_ERROR, null, err)
                );
            });
    }

    public async getProductById(id: IProduct['_id']): Promise<ResponseOperation<IProduct>>{
        return ProductModel.findById({ _id: id }).populate({ path: 'publisher', select: ['company', 'email', 'nickname', 'status']}).exec()
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
