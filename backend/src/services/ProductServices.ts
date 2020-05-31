import { Request, Response } from 'express';
import ProductControllerMongo from '../controllers/ProductControllerMongo';
import { IProduct, IProductPrototype, IProductController } from '../interfaces/ProductInterface';
import { isNullOrUndefined } from 'util';
import ResponseOperation from '../helpers/ResponseOperation';
import { HttpCode } from '../helpers/HttpCodes';

export default class ProductServices {
    public static routes(app: any): void {
        app.post('/apisec/product/create', (req: Request, res: Response) => {
            try {
                this.create(req, res);
            } catch (e) {
                const message = e
                this.response(res, new ResponseOperation<IProduct>(false, HttpCode.BAD_REQUEST, null, { message })
                );
            }
        });

        app.get('/api/product/all', (req: Request, res: Response) => {
            try {
                this.getAll(req, res);
            } catch (e) {
                const message = e;
                this.response(res, new ResponseOperation<IProduct>(false, HttpCode.BAD_REQUEST, null, { message }));
            }
        });

        app.get('/api/product/:id', (req: Request, res: Response) => {
            try {
                this.getProduct(req, res);
            } catch (e) {
                const message = e;
                this.response(res, new ResponseOperation<IProduct>(false, HttpCode.BAD_REQUEST, null, { message }));
            }
        });

        app.put('/apisec/product/update', (req: Request, res: Response) => {
            try {
                this.updateProduct(req, res);
            } catch (e) {
                const message = e;
                this.response(res, new ResponseOperation<IProduct>(false, HttpCode.BAD_REQUEST, null, { message }));
            }
        });

        app.put('/apisec/product/activate', (req: Request, res: Response) => {
            try {
                this.activateProduct(req, res);
            } catch (e) {
                const message = e;
                this.response(res, new ResponseOperation<IProduct>(false, HttpCode.BAD_REQUEST, null, { message }));
            }
        });

        app.put('/apisec/product/inactivate', (req: Request, res: Response) => {
            try {
                this.inactivateProduct(req, res);
            } catch (e) {
                const message = e;
                this.response(res, new ResponseOperation<IProduct>(false, HttpCode.BAD_REQUEST, null, { message }));
            }
        });

        app.delete('/apisec/product/delete/:id', (req: Request, res: Response) => {
            try {
                this.deleteProduct(req, res);
            } catch (e) {
                const message = e;
                this.response(res, new ResponseOperation<IProduct>(false, HttpCode.BAD_REQUEST, null, { message }));
            }
        });
    }

    private static create(req: any, res: Response) {
        const productController: IProductController = new ProductControllerMongo();
        const product: IProductPrototype = {
            name: req.body.name,
            description: req.body.description,
            metricPrice: req.body.metricPrice,
            image: req.body.image,
            quantity: req.body.quantity,
            metric: req.body.metric,
            tags: req.body.tags,
            publisher: req.user._id,
        };
        productController.createProduct(product)
            .then((result: ResponseOperation<IProduct>) => this.response(res, result))
            .catch((result: ResponseOperation<IProduct>) => this.response(res, result));
    }

    private static getAll(req: Request, res: Response) {
        const productController: IProductController = new ProductControllerMongo();
        const limit: number = +req.query.limit || 10;
        const page: number = +req.query.page || 1;
        productController.getProducts(limit, page)
            .then((result) => this.response(res, result))
            .catch((result) => this.response(res, result));
    }

    private static getProduct(req: Request, res: Response) {
        const productController: IProductController = new ProductControllerMongo();
        const { id } = req.params;
        productController.getProductById(id)
            .then((result) => this.response(res, result))
            .catch((result) => this.response(res, result));
    }

    private static updateProduct(req: any, res: Response) {
        const productController: IProductController = new ProductControllerMongo();
        const product: IProductPrototype = {
            _id: req.body._id,
            name: req.body.name,
            description: req.body.description,
            metricPrice: req.body.metricPrice,
            image: req.body.image,
            quantity: req.body.quantity,
            metric: req.body.metric,
            tags: req.body.tags,
            publisher: req.user._id,
        };
        productController.updateProduct(product)
            .then((result) => this.response(res, result))
            .catch((result) => this.response(res, result));
    }

    private static activateProduct(req: Request, res: Response) {
        const productController: IProductController = new ProductControllerMongo();
        const { productId } = req.body;
        productController.activateProductById(productId)
            .then((result) => this.response(res, result))
            .catch((result) => this.response(res, result));
    }

    private static inactivateProduct(req: Request, res: Response) {
        const productController: IProductController = new ProductControllerMongo();
        const { productId } = req.body;
        productController.inactiveProductById(productId)
            .then((result) => this.response(res, result))
            .catch((result) => this.response(res, result));
    }

    private static deleteProduct(req: Request, res: Response) {
        const productController: IProductController = new ProductControllerMongo();
        const { id } = req.params;
        productController.deleteProductById(id)
            .then((result) => this.response(res, result))
            .catch((result) => this.response(res, result));
    }

    public static response(res: Response, result: ResponseOperation<any>) {
        res.status(result.statusCode).json(result);
    }
}
