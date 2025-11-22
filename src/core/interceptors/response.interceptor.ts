/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/naming-convention */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  StreamableFile,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { map, Observable } from 'rxjs';

export interface Response<T> {
  statusCode: number;
  message: string;
  data: T | T[];
}

export interface ResponseLegacy<T> {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  status_code: number;
  isError: boolean;
  message: string;
  result: T | T[];
}

/**
 * Interceptor for handle HTTP responses
 *
 * @export
 * @class ResponseInterceptor
 * @typedef {ResponseInterceptor}
 * @template T
 * @implements {NestInterceptor<T, Response<T>>}
 *
 * @example
 * For use this interceptor in your app, add the next code in your app main.ts
 * file:
 * // Interceptores
 * app.useGlobalInterceptors(new ResponseInterceptor());
 *
 * @reference https://docs.nestjs.com/interceptors
 */
@Injectable()
export class ResponseInterceptor<T>
  implements
    NestInterceptor<T, Response<T> | ResponseLegacy<T> | StreamableFile>
{
  constructor(private reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T> | ResponseLegacy<T> | StreamableFile> {
    // Get response info
    const httpContext = context.switchToHttp();
    const response = httpContext.getResponse();

    if (
      httpContext.getRequest().method === 'POST' &&
      response.statusCode === 201
    ) {
      response.status(200);
    }

    const contentType = this.reflector.get<string>(
      'contentType',
      context.getHandler(),
    );

    // Build and return data
    return next.handle().pipe(
      map((data) => {
        if (data instanceof StreamableFile) {
          if (contentType) {
            response.setHeader('Content-Type', contentType);
          }
          return data;
        }

        return {
          statusCode: response.statusCode,
          message: 'Petición exitosa.',
          data: data ? data : [],
        };
      }),
    );
  }
}
