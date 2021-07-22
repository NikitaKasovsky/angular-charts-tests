/**
 * o, h, l, c - это данные для построения свечки (open,high,low,close). Иногда, когда мы запрашиваем PRICE, то вернуться может только c - close, тогда мы строим линию а не свечу. Это значение для оси Y
 * s - status, "ok" значит ok)
 * t - timestamp, тут значения для оси X
 * v - volume, объём. По нему строим бары
 */

export interface ChartsHttpInterface {
  t: number[];
  c: number[];
  o: number[];
  h: number[];
  l: number[];
  v: number[];
  s: string;
}
