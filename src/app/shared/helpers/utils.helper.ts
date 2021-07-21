import { HttpParams } from '@angular/common/http';

interface InputParamsInterface {
  [param: string]: string | ReadonlyArray<string>;
}

export function getHttpParams(args: InputParamsInterface): HttpParams {
  for (const argsKey in args) {
    if (!args[argsKey]) {
      delete args[argsKey];
    }
  }

  return new HttpParams({
    fromObject: args
  });
}
