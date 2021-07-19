import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LightweightChartsComponent } from "../charts/components/lightweight-charts/lightweight-charts.component";
import { TabsComponent } from "./compoents/tabs/tabs.component";

const routes: Routes = [
  {
    path: '',
    component: TabsComponent,
    children: [
      {
        path: '',
        redirectTo: 'lightweight-charts',
        pathMatch: 'full'
      },
      {
        path: 'lightweight-charts',
        component: LightweightChartsComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsRoutingModule { }
