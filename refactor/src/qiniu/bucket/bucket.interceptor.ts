import { Injectable, NestInterceptor, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Bucket } from './interfaces/bucket.interface';

@Injectable()
export class BucketInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    call$: Observable<any>,
  ): Observable<any> {
    return call$.pipe(map((data): Bucket[] => {
      return data.reduce((arr: Bucket[], item: string, index: string) => {
        arr.push({
          name: item,
          id: `bucket_${index}`,
        });
        return arr;
      }, []);
    }));
  }
}