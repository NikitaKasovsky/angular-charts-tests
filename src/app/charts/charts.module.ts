import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LightweightChartsComponent } from './components/lightweight-charts/lightweight-charts.component';
import { CoreModule } from '../core/core.module';
import { ChartJsComponent } from './components/chart-js/chart-js.component';


@NgModule({
  declarations: [
    LightweightChartsComponent,
    ChartJsComponent
  ],
  exports: [
    LightweightChartsComponent,
    ChartJsComponent
  ],
  imports: [
    CommonModule,
    CoreModule
  ]
})
export class ChartsModule { }
