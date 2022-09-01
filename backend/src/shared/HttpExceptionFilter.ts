import { ArgumentsHost, Catch, ExceptionFilter, Logger} from '@nestjs/common'
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter{
    catch(exception: any, host: ArgumentsHost) {
        const status = exception?.status?exception?.status:500;

        const request = host.switchToHttp().getRequest<Request>();
        const response = host.switchToHttp().getResponse<Response>();

        const {url,method,body} = request;
        Logger.error(`request: ${method} ${url} ${exception.message} `)

        response.status(status).json({
            path:url,
            method,
            code:status,
            message:exception.message,
            timestamp:new Date()
        })
    }

}
