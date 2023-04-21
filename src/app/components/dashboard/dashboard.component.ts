import { Component } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  rawData;
  constructor(private sharedService: SharedService) {
  }

  ngAfterViewInit() {
    this.getRawData();
  }

  getRawData() {
    this.sharedService.getRawData().subscribe((rawData) => {
      this.rawData = rawData;
    });
  }
}
