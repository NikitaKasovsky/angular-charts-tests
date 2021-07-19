import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LightweightChartsComponent } from './components/lightweight-charts/lightweight-charts.component';


@NgModule({
  declarations: [
    LightweightChartsComponent
  ],
  exports: [
    LightweightChartsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ChartsModule { }
