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

        app.put('/apisec/product/activate/:id', (req: Request, res: Response) => {
            try {
                this.activateProduct(req, res);
            } catch (e) {
                const message = e;
                this.response(res, new ResponseOperation<IProduct>(false, HttpCode.BAD_REQUEST, null, { message }));
            }
        });

        app.put('/apisec/product/inactivate/:id', (req: Request, res: Response) => {
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

    private static create(req: Request, res: Response) {
        const productController: IProductController = new ProductControllerMongo();
        const product: IProductPrototype = {
            name: String(req.body.name || ''),
            description: String(req.body.description || ''),
            metricPrice: String(req.body.metricPrice || ''),
            image: String(req.body.image || ''),
            quantity: String(req.body.quantity || ''),
            metric: String(req.body.metric || ''),
            tags: Array(req.body.tags || ''),
            publisher: String(req.body.publisher || ''),
        };
        productController.createProduct(product)
            .then((result: ResponseOperation<IProduct>) => this.response(res, result))
            .catch((result: ResponseOperation<IProduct>) => this.response(res, result));
    }

    private static getAll(req: Request, res: Response) {
        const productController: IProductController = new ProductControllerMongo();
        productController.getProducts()
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

    private static updateProduct(req: Request, res: Response) {
        const productController: IProductController = new ProductControllerMongo();
        const product: IProductPrototype = {
            _id: String(req.body._id || ''),
            name: String(req.body.name || ''),
            description: String(req.body.description || ''),
            metricPrice: String(req.body.metricPrice || ''),
            image: String(req.body.image || ''),
            quantity: String(req.body.quantity || ''),
            metric: String(req.body.metric || ''),
            tags: Array(req.body.tags || ''),
            publisher: String(req.body.publisher || ''),
        };
        productController.updateProduct(product)
            .then((result) => this.response(res, result))
            .catch((result) => this.response(res, result));
    }

    private static activateProduct(req: Request, res: Response) {
        const productController: IProductController = new ProductControllerMongo();
        const { id } = req.params;
        productController.activateProductById(id)
            .then((result) => this.response(res, result))
            .catch((result) => this.response(res, result));
    }

    private static inactivateProduct(req: Request, res: Response) {
        const productController: IProductController = new ProductControllerMongo();
        const { id } = req.params;
        productController.inactiveProductById(id)
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
