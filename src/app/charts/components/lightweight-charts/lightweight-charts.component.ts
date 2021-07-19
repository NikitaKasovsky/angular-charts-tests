import { Component, OnInit } from '@angular/core';
import { createChart } from 'lightweight-charts';

@Component({
  selector: 'app-lightweight-charts',
  templateUrl: './lightweight-charts.component.html',
  styleUrls: ['./lightweight-charts.component.scss']
})
export class LightweightChartsComponent implements OnInit {

  constructor() { }

  private chart: any;
  private lineSeries: any;

  public ngOnInit(): void {
    const container = document.getElementById('lightweight-chart') as HTMLElement;
    this.chart = createChart(container, { width: 1000, height: 500 });
    this.lineSeries = this.chart.addLineSeries();
    this.lineSeries.setData([
      { time: '2019-04-11', value: 80.01 },
      { time: '2019-04-12', value: 96.63 },
      { time: '2019-04-13', value: 76.64 },
      { time: '2019-04-14', value: 81.89 },
      { time: '2019-04-15', value: 74.43 },
      { time: '2019-04-16', value: 80.01 },
      { time: '2019-04-17', value: 96.63 },
      { time: '2019-04-18', value: 76.64 },
      { time: '2019-04-19', value: 81.89 },
      { time: '2019-04-20', value: 74.43 },
    ]);

    const lineSeriesOne = this.chart.addLineSeries();
    lineSeriesOne.setData([
      { time: '2019-04-11', value: 70.01 },
      { time: '2019-04-12', value: 76.63 },
      { time: '2019-04-13', value: 76.64 },
      { time: '2019-04-14', value: 71.89 },
      { time: '2019-04-15', value: 74.43 },
      { time: '2019-04-16', value: 70.01 },
      { time: '2019-04-17', value: 76.63 },
      { time: '2019-04-18', value: 76.64 },
      { time: '2019-04-19', value: 71.89 },
      { time: '2019-04-20', value: 74.43 },
    ]);
  }
}
