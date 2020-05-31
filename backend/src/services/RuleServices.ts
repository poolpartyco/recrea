import { Request, Response } from 'express';
import ResponseOperation from '../helpers/ResponseOperation';
import { metrics } from '../rules/MetricList'
import { HttpCode } from '../helpers/HttpCodes';

export default class RuleServices {

    public static routes(app: any){
        app.get('/api/rule/metrics', (req: Request, res: Response) => {
            try {
                return this.respond(res, new ResponseOperation<string[]>(true, HttpCode.OK, metrics));
            } catch (e){
                return this.respond(res, new ResponseOperation<string[]>(false, HttpCode.BAD_REQUEST, null, {msf: 'Incorrect params'}));
            }
        })
    }

    private static respond(res: Response, result: ResponseOperation<any>){
        res.status(result.statusCode).json(result);
    }
}