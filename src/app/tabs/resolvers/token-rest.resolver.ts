import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import {
  ChartsHttpResponsesService
} from '../../core/services/charts-http-responses.service';
import { HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ITokenRestApiResponse } from '../../core/interfaces/charts-http';

@Injectable({
  providedIn: 'root'
})
export class TokenRestResolver implements Resolve<string> {

  constructor(
    private readonly chartsHttpResponsesService: ChartsHttpResponsesService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string> {
    return this.chartsHttpResponsesService.getRestApiToken()
      .pipe(map((data: HttpResponse<ITokenRestApiResponse>) => {
        return data.body?.token as string;
      }))
  }
}
