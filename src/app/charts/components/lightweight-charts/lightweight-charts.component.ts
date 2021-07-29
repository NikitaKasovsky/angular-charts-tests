import {
  Component,
  OnInit
} from '@angular/core';
import { createChart } from 'lightweight-charts';
import { ChartsHttpResponsesService } from '../../../core/services/charts-http-responses.service';
import { getHttpParams } from '../../../shared/helpers/utils.helper';
import { ActivatedRoute } from '@angular/router';
import { IChartsHttp } from "../../../core/interfaces/charts-http";
import {
  getAAPL,
  getTSLA,
  historyParams
} from "./stocks.locale";
import { zip } from "rxjs";

@Component({
  selector: 'app-lightweight-charts',
  templateUrl: './lightweight-charts.component.html',
  styleUrls: ['./lightweight-charts.component.scss']
})
export class LightweightChartsComponent implements OnInit {

  constructor(
    private readonly chartsHttpResponsesService: ChartsHttpResponsesService,
    private readonly activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.data
      .subscribe((data: any) => {
        this.token = data.token;
        this.nextTime = data.initialStock.nextTime;
      });
  }

  private chart: any;
  private token: string = '';
  private nextTime: number = 0;

  public ngOnInit(): void {
    this.chartsHttpResponsesService.getRestApiToken()
      .subscribe(console.log);
    this.initChart();
    this.loadHistory({
      resolution: '1',
      from: (this.nextTime - 60 * 60 * 24).toString(),
      to: (this.nextTime).toString()
    });
  }

  private loadHistory(historyParams: historyParams): void {
    zip(
      // this.chartsHttpResponsesService.getLCHistory(getHttpParams(getTSLA(historyParams)), this.token),
      this.chartsHttpResponsesService.getLCHistory(getHttpParams(getAAPL(historyParams)), this.token)
    )
      .subscribe((allPoints) => {
        allPoints.forEach(points => this.setData(points as IChartsHttp));
        this.chart.addBarSeries().setData();
      });
  }

  private initChart(): void {
    const container = document.getElementById('lightweight-chart') as HTMLElement;
    this.chart = createChart(container, {width: 1000, height: 500});
  }

  private setData(points: IChartsHttp): void {
    this.chart.addLineSeries().setData(this.mapTimeData(points.t, points.c));
    this.chart.addHistogramSeries({
      color: '#26a69a',
      priceFormat: {
        type: 'volume',
      },
      priceScaleId: '',
      scaleMargins: {
        top: 0.8,
        bottom: 0,
      },
    }).setData(this.mapTimeData(points.t, points.v));
    this.chart.addCandlestickSeries().setData(this.mapCandleData(points));
  }

  private mapTimeData(timePoints: number[], points: number[]): Object {
    return timePoints.map((timePoint, index) => {
      return {time: timePoint, value: points[index]}
    });
  }

  private mapCandleData(points: IChartsHttp): Object {
    return points.t.map((timePoint, index) => {
      return {
        time: timePoint,
        open: points.o[index],
        high: points.h[index],
        low: points.l[index],
        close: points.c[index]
      }
    });
  }
}
