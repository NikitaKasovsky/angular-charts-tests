import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  public tabLinks = [
    {
      label: 'Lightweight-charts',
      link: './lightweight-charts'
    },
    {
      label: 'Chart-JS',
      link: './chart-js'
    }
  ];
  private activeTabIndex = -1;

  public ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.activeTabIndex = this.tabLinks.findIndex(tab => tab.link === '.' + this.router.url);
    })
  }

}
