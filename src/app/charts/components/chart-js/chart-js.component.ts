import {
  Component,
  OnInit
} from '@angular/core';
import {
  Chart,
  registerables
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import { ActivatedRoute } from '@angular/router';
import {
  ChartsHttpResponsesService
} from '../../../core/services/charts-http-responses.service';
import { IRestRT } from '../../../core/interfaces/charts-http';

Chart.register(...registerables, zoomPlugin);

@Component({
  selector: 'app-chart-js',
  templateUrl: './chart-js.component.html',
  styleUrls: ['./chart-js.component.scss']
})
export class ChartJsComponent implements OnInit {

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly chartsHttpResponsesService: ChartsHttpResponsesService
  ) {
    this.activatedRoute.data
      .subscribe((data: any) => {
        this.token = data.token;
      });
  }

  private token: string = '';
  private chart: Chart | undefined;

  public ngOnInit(): void {
    this.loadDataRT();
  }

  private initChart(data: IRestRT): void {
    this.chart = new Chart(document.getElementById('chart-js') as HTMLCanvasElement, {
      type: 'line',
      data: {
        labels: data.data.map((item) => {
          const date = new Date(item.expirationDate)
          return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`
        }),
        datasets: [
          {
            label: 'line iv',
            data: data.data.map((item) => item.iv)
          }
        ]
      },
      options: {
        plugins: {
          zoom: {
            pan: {
              enabled: true,
              mode: 'xy',
              threshold: 5,
            },
            zoom: {
              wheel: {
                enabled: true
              },
              pinch: {
                enabled: true
              },
              mode: 'xy',
            },
          }
        },
        scales: {
          y: {
            type: 'linear',
            min: 0.0,
            max: 2.0
          }
        }
      }
    });
  }

  private loadDataRT(): void {
    this.chartsHttpResponsesService.getRestApiRealtime(this.token)
      .subscribe((data: IRestRT) => {
        this.initChart(data)
      })
  }
}
