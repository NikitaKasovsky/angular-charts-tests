import {
  Component,
  OnInit
} from '@angular/core';
import { createChart } from 'lightweight-charts';
import { ChartsHttpResponsesService } from '../../../core/services/charts-http-responses.service';
import { getHttpParams } from '../../../shared/helpers/utils.helper';
import { ActivatedRoute } from '@angular/router';
import { map } from "rxjs/operators";

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
  private userId = 221023;
  private uuid = '9C158135-D1F2-4B1B-BEFB-45779F4462B5';
  private token: string = '';

  public ngOnInit(): void {
    this.initChart();
    this.loadHistory();
  }

  private loadHistory(): void {
    const params = {
      symbol: 'TSLA:NASDAQ:21400:IVX:221023:rt:30:true',
      resolution: '1',
      from: '1626785684',
      to: '1626872144',
      userId: this.userId.toString(),
      mode: 'rt',
    }

    this.chartsHttpResponsesService.getLCHistory(getHttpParams(params), this.token)
      .subscribe((data) => {
        console.log(data)
      })
  }

  private initChart(): void {
    const container = document.getElementById('lightweight-chart') as HTMLElement;
    this.chart = createChart(container, {width: 1000, height: 500});
  }
}
