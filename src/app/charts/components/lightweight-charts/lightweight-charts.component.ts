import {
  Component,
  OnInit
} from '@angular/core';
import {
  BarData,
  createChart
} from 'lightweight-charts';
import { ChartsHttpResponsesService } from '../../../core/services/charts-http-responses.service';
import { getHttpParams } from '../../../shared/helpers/utils.helper';
import { ActivatedRoute } from '@angular/router';
import { map } from "rxjs/operators";
import { ChartsHttpInterface } from "../../../core/interfaces/charts-http";
import {
  getAAPL,
  getTSLA
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
      .pipe(map(data => data.token))
      .subscribe((token: string) => {
        this.token = token
      });
  }

  private chart: any;
  private token: string = '';

  public ngOnInit(): void {
    this.initChart();
    this.loadHistory();
  }

  private loadHistory(): void {
    zip(
      this.chartsHttpResponsesService.getLCHistory(getHttpParams(getTSLA()), this.token),
      this.chartsHttpResponsesService.getLCHistory(getHttpParams(getAAPL()), this.token)
    )
      .subscribe((allPoints) => {
        allPoints.forEach(points => this.setData(points as ChartsHttpInterface));
        this.chart.addBarSeries().setData();
      });
  }

  private initChart(): void {
    const container = document.getElementById('lightweight-chart') as HTMLElement;
    this.chart = createChart(container, {width: 1000, height: 500});
  }

  private setData(points: ChartsHttpInterface): void {
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

  private mapCandleData(points: ChartsHttpInterface): Object {
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
