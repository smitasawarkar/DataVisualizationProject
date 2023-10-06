
import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Chart } from 'node_modules/chart.js';
import randomColor from 'randomcolor';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})

export class ChartService {
  chartdata!: Object;
  private baseUrl = environment.baseUrl;
  constructor(private dataService:DataService,private http: HttpClient) { }
  private destroyChart(chartId: string) {
    const existingChart = Chart.getChart(chartId);
    if (existingChart) {
      existingChart.destroy();
    }
  }


 chartUser(chart: any) {
    return this.http.get(`${this.baseUrl}/transaction/institution/wise`, chart);
  }

  generateBackgroundColors(data: { [key: string]: number }): string[] {
    const colors: string[] = [];
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        colors.push(randomColor());
      }
    }
    return colors;
  }

  renderPiChar(org: any) {
    this.destroyChart('piechart');
    const myChart= new Chart("piechart", {
       type: 'pie',
       data: {
         labels: Object.keys(org),
         datasets: [{
          label: 'Sum of transaction amount',
           data: Object.values(org),
           backgroundColor: this.generateBackgroundColors(org),
           borderWidth: 1
         }]
       },
       options: {
         aspectRatio :1
       },
     });
   }

   renderBarChart(org: any) {
    this.destroyChart('barchart');
    const myChart= new Chart("barchart", {
       type: 'bar',
       data: {
         labels: Object.keys(org),
         datasets: [{
           label: 'Sum of transaction amount',
           data: Object.values(org),
           backgroundColor: this.generateBackgroundColors(org),
           borderWidth: 1
         }]
       },
       options: {
         scales: {
           y: {
             beginAtZero: true
           }
         },
         aspectRatio:1
       },
     });
   }

 //line chart 
 renderLineChart(org: any) {
  this.destroyChart('linechart');
  const myChart= new Chart("linechart", {
     type: 'line',
     data: {
       labels: Object.keys(org),
       datasets: [{
         label: 'Sum of transaction amount',
         data: Object.values(org),
         backgroundColor: this.generateBackgroundColors(org),
         borderWidth: 1
       }]
     },

     options: {
       scales: {
         y: {
           beginAtZero: true
         }
       },
       aspectRatio:1
     },
   });
 }

}

 