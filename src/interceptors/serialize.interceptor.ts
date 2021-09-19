import { UseInterceptors, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs";
import { plainToClass } from "class-transformer";

export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto: any) {}
    intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
        // Run something before a request is handled by the request handled
        // console.log("Running before handler", context);

        return handler.handle().pipe(
            map((data: any) => {
                // Run something before sending the response
                // console.log('Running before sending response', data);
                return plainToClass(this.dto, data, {excludeExtraneousValues: true});
            })
        )

    }
}
