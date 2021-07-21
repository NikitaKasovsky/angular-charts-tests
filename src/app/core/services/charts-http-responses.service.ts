import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartsHttpResponsesService {

  constructor(
    private http: HttpClient
  ) { }

  public getIVToken(params: HttpParams): Observable<string> {
    return this.http.get('https://devivlive-front.ivolatility.com/token/get', {responseType: 'text', params})
  }

  public getLCHistory(params: HttpParams, token: string): Observable<HttpResponse<any>> {
    return this.http.get('https://devivlive-front.ivolatility.com/tradingview/history',
      {headers: {'authorization': 'Bearer ' + token}, observe: 'response', params})
  }
}
