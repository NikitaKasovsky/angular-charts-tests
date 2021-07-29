import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { ChartsHttpResponsesService } from "../../core/services/charts-http-responses.service";
import { getHttpParams } from "../../shared/helpers/utils.helper";
import { IChartsHttp } from "../../core/interfaces/charts-http";
import { getAAPL } from "../../charts/components/lightweight-charts/stocks.locale";

@Injectable({
  providedIn: 'root'
})
export class NextTimeResolverResolver implements Resolve<IChartsHttp | null> {

  constructor(
    private readonly chartsHttpResponsesService: ChartsHttpResponsesService
  ) {
  }

  private token: string = '';

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IChartsHttp | null> {
    this.token = sessionStorage.getItem('token-iv') as string;
    return this.chartsHttpResponsesService.getLCHistory(getHttpParams(getAAPL(
      {
        resolution: '1',
        from: '1',
        to: '1'
      }
    )), this.token);
  }
}
