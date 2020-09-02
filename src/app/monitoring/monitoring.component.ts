import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { StatusCounter } from '../models/status-counter';
import { VehicleStatusService } from '../vehicle-status/vehicle-status.service';
import { VehicleInfo } from '../models/vehicle-info';

// chart modules
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective, Color, Label, MultiDataSet } from 'ng2-charts';

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.css'],
})
export class MonitoringComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  // settings of doughnutChart
  public doughnutChartData: number[] = [0, 0];
  public doughnutChartLabels: Label[] = ['Online', 'Offline'];
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutColors: Color[] = [
    {
      backgroundColor: [
        'rgb(3,218,197)',
        'rgb(255,2,102)',
      ]
    }
  ];

  public allVehicles$: Observable<VehicleInfo[]>;
  public searchText: string;

  constructor(private vehicleStatusService: VehicleStatusService) { }

  ngOnInit() {
    // get information of vehicles and customers
    this.allVehicles$ = this.vehicleStatusService.getVehicleInfo();

    // subscribe the value of counter, and update doughnutChart when the value changes
    this.vehicleStatusService.changedCounterState.subscribe(
      (counter: StatusCounter) => {
        // set updated data to chart's dataset
        this.doughnutChartData[0] = counter.numOfOnline;
        this.doughnutChartData[1] = counter.numOfOffline;

        // refresh the chart
        this.chart.ngOnChanges({});
      }
    );
  }
}
