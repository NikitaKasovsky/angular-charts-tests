import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {
  Observable
} from 'rxjs';
import { ChartsHttpResponsesService } from '../../core/services/charts-http-responses.service';
import { getHttpParams } from "../../shared/helpers/utils.helper";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TokenIvResolver implements Resolve<string> {

  constructor(
    private readonly chartsHttpResponsesService: ChartsHttpResponsesService
  ) {
  }

  private userId = 221023;
  private uuid = '9C158135-D1F2-4B1B-BEFB-45779F4462B5';

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string> {
    const params = {
      userId: this.userId.toString(),
      uuid: this.uuid
    }

    return this.chartsHttpResponsesService.getIVToken(getHttpParams(params))
      .pipe(map((token: string) => {
        sessionStorage.setItem('token', token)
        return token;
      }))
  }
}
