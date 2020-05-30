import { HttpCode } from './HttpCodes';

export default class ResponseOperation<T> {
    success: boolean;
    statusCode: HttpCode;
    data: T;
    error?: any;

    constructor(success: boolean, statusCode: HttpCode, data: T, error?: any) {
        this.success = success;
        this.statusCode = statusCode;
        this.data = data;
        this.error = error;
    }
}
