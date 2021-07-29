/**
 * o, h, l, c - это данные для построения свечки (open,high,low,close).
 * Иногда, когда мы запрашиваем PRICE, то вернуться может только c - close,
 * тогда мы строим линию, а не свечу. Это значение для оси Y
 * s - status, "ok" значит ok)
 * t - timestamp, тут значения для оси X
 * v - volume, объём. По нему строим бары
 */

export interface IChartsHttp {
  t: number[];
  c: number[];
  o: number[];
  h: number[];
  l: number[];
  v: number[];
  s: string;
}

export interface IRestRT {
  status: Status;
  query: Query;
  data: Datum[];
}

export interface Status {
  executionTime: number;
  recordsFound: number;
  code: string;
}

export interface Query {
  requestUUID: string;
  stockId: string;
  strikeMin: string;
  strikeMax: string;
}

export interface Datum {
  symbol: string;
  stockId: number;
  expirationDate: Date;
  strike: number;
  type: string;
  style: string;
  openInterest: number;
  bidPrice: number;
  askPrice: number;
  lastPrice: number;
  bidDate: string;
  askDate: string;
  lastDate: string;
  bidSize: number;
  askSize: number;
  underlyingPrice: number;
  iv: number;
  delta: number;
  vega: number;
  gamma: number;
  theta: number;
  rho: number;
  preIv: number;
  theoPrice: number;
  forwardPrice: number;
  timestamp: Date;
  sentToESTimestamp: Date;
  cumulativeVolume?: number;
}

export interface ITokenRestApiResponse {
  login: string,
  token: string,
  userID: number
}
