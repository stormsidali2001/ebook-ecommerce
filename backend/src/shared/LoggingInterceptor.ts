import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from "@nestjs/common";
import { Request } from "express";
import { Observable, tap } from "rxjs";


@Injectable()
export class LoggingInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest<Request>();
        const {url,method,body} = request;
        const then = Date.now();
        return next.handle()
        .pipe(
            tap(()=>{
                Logger.log(`request: ${method} ${url}  ${JSON.stringify(body)} ${Date.now() - then}ms`,context.getClass().name+'/'+context.getHandler().name)
            })
        )

    }

}