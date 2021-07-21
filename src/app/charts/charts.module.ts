import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LightweightChartsComponent } from './components/lightweight-charts/lightweight-charts.component';
import { CoreModule } from '../core/core.module';


@NgModule({
  declarations: [
    LightweightChartsComponent
  ],
  exports: [
    LightweightChartsComponent
  ],
  imports: [
    CommonModule,
    CoreModule
  ]
})
export class ChartsModule { }
