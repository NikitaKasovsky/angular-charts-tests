import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  IChartsHttp,
  IRestRT,
  ITokenRestApiResponse
} from '../interfaces/charts-http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChartsHttpResponsesService {

  constructor(
    private http: HttpClient
  ) {
  }

  public getIVToken(params: HttpParams): Observable<string> {
    return this.http.get('https://devivlive-front.ivolatility.com/token/get', {responseType: 'text', params})
  }

  public getLCHistory(params: HttpParams, token: string): Observable<IChartsHttp | null> {
    return this.http.get<IChartsHttp>(
      'https://devivlive-front.ivolatility.com/tradingview/history',
      {headers: {'authorization': 'Bearer ' + token}, observe: 'response', params}
    ).pipe(map((res: HttpResponse<IChartsHttp>) => res.body));
  }

  public getRestApiToken(): Observable<HttpResponse<ITokenRestApiResponse>> {
    return this.http.get<ITokenRestApiResponse>('https://cloud.ivolatility.com/api/rest/v2/auth/token?login=DVorontsov&password=volatilitypassword1', {observe: 'response'})

  }

  public getRestApiRealtime(token: string): Observable<IRestRT> {
    return this.http.get<IRestRT>(
      `https://cloud.ivolatility.com/api/rest/v2/realtime/options?token=${token}&stockid=799&strike_min=0&strike_max=1000&exp_month=1&moneyness_from=1`,
      {observe: 'response'}
    )
      .pipe(map((data: HttpResponse<IRestRT>) => data.body as IRestRT))
  }
}
