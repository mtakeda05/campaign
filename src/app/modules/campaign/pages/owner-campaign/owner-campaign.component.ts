import { Component, OnInit, ViewChildren, Input, ChangeDetectorRef, HostListener } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HighchartsChartComponent } from 'highcharts-angular';

import { Customer } from '../../interfaces/customer.interface';
import { Owner } from '../../interfaces/owner.interface';
import { CampaignOwnerService } from '../../services/campaign-owners.service';

@Component({
  selector: 'owner-campaign',
  templateUrl: './owner-campaign.component.html',
  styleUrls: ['./owner-campaign.component.scss']
})
export class OwnerCampaignComponent implements OnInit {
  @Input() ownerId: string = '';
  owners: Owner[] = [];
  customers: Customer[] = []
  highcharts = Highcharts;
  totalCustomers = 0;
  totalEmailsSent = 0;

  completed = 0;
  notCompleted = 0;
  successRate = 0;
  failureRate = 0;

  pieChartOptions = {};
  columnChartOptions = {};

  constructor(
    private ownerService: CampaignOwnerService, private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.ownerService.getOwners().subscribe(
      owners => {
        this.owners = owners;
        const owner = this.owners.find(item => item.id === this.ownerId);
        if (owner) {
          this.customers = owner.customers;
          this.completed = this.customers.filter(customer => customer.status === 3).length
          this.notCompleted = this.customers.filter(customer => customer.status !== 3).length
          this.successRate = +(this.completed / (this.completed + this.notCompleted) * 100).toFixed(2)
          this.failureRate = +(this.notCompleted / (this.completed + this.notCompleted) * 100).toFixed(2)

          this.pieChartOptions = this.getPieOptions();
          this.columnChartOptions = this.getColumnOptions();


          const customers = this.customers.length;
          const emails = this.customers.reduce((total, customer) => total + customer.emails, 0);
          this.animateNumbers(customers, emails);
        }
      }
    );
  }

  animateNumbers(cTotal: number, eTotal: number) {
    const customersInterval = setInterval(() => {
      if (this.totalCustomers < cTotal) {
        this.totalCustomers++;
      } else {
        clearInterval(customersInterval);
      }
    }, 1);

    const emailsInterval = setInterval(() => {
      if (this.totalEmailsSent < eTotal) {
        this.totalEmailsSent++;
      } else {
        clearInterval(emailsInterval);
      }
    }, 1);
  }

  getColumnOptions() {
    return {
      chart: {
          type: 'column'
      },
      title: {
          text: 'Success Rate and Failure Rate'
      },
      xAxis: {
          categories: ['Customers']
      },
      yAxis: {
          title: {
              text: 'Percentage'
          }
      },
      plotOptions: {
          column: {
              dataLabels: {
                  enabled: true
              }
          }
      },
      series: [{
          name: 'Success Rate',
          data: [{
              y: this.successRate,
              color: '#25ced1'
          }],
          color: '#25ced1'
      }, {
          name: 'Failure Rate',
          data: [{
              y: this.failureRate,
              color: '#ff8a5b'
          }],
          color: '#ff8a5b'
      }]
    };
  }

  getPieOptions() {
    return {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'Status of Customers'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
        }
      },
      series: [{
        name: 'Status',
        colorByPoint: true,
        data: [{
          name: 'No response',
          y: this.customers.filter(customer => customer.status === 1).length,
          color: '#ff8a5b'
        }, {
          name: 'Declined',
          y: this.customers.filter(customer => customer.status === 2).length,
          color: '#ea526f'
        }, {
          name: 'Completed',
          y: this.customers.filter(customer => customer.status === 3).length,
          color: '#25ced1'
        }, {
          name: 'In progress',
          y: this.customers.filter(customer => customer.status === 4).length,
          color: '#fceade'
        }]
      }]
    };
  }
}
