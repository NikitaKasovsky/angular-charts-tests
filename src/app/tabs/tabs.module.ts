import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsRoutingModule } from "./tabs-routing.module";
import { TabsComponent } from './compoents/tabs/tabs.component';
import { MatTabsModule } from "@angular/material/tabs";
import { ChartsModule } from "../charts/charts.module";


@NgModule({
  declarations: [
    TabsComponent
  ],
  imports: [
    CommonModule,
    TabsRoutingModule,
    MatTabsModule,
    ChartsModule
  ]
})
export class TabsModule { }
