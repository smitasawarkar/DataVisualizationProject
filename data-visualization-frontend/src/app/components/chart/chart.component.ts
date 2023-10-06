import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { Chart, ChartOptions, registerables } from 'node_modules/chart.js';
import { ChartService } from 'src/app/services/chart.service';
import { DataService } from 'src/app/services/data.service';

Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {
  data!: any[];
  instdata!: any[];
  chartdata!: any;
  institutionchartdata!: any;
  receivedData: any = {};
  receivedInstitutionData: any = {};
  filterParam: string = "";
  barChartData!: any;
  pieChartData: any;
  lineChartData: any;
  showButton: boolean = false;

  constructor(
    private ChartService: ChartService,
    private dataService: DataService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params: Params) => {
      this.filterParam = params['filterParam'];
      //console.log('Filter Value:', this.filterParam);
    });
  }

  setData(data: any) {
    if (
      this.filterParam == "FILTER_TXN_BY_EXPANSE" ||
      this.filterParam == "FILTER_TXN_BY_CARD" ||
      this.filterParam == "FILTER_TXN_BY_GENDER"
    ) {
      //console.log('call if  setChartData ()');
      this.setChartData(data);
    } else {
      //console.log('call else setInstitutionData ()');
      this.setInstitutionData(data);
    }
  }

  setChartData(data: any) {
    this.receivedData = {
      bank: data.bank,
      type: this.filterParam,
      fromDate: data.fromDate,
      toDate: data.toDate,
    };

    this.dataService.getbytype(this.receivedData).subscribe((result) => {
      this.chartdata = result;
      // console.log(this.chartdata);

      if (data.chartType == 'bar') {
        this.barChartData = this.chartdata.allfilterTransactions;
        console.log("barChartData :: ",this.barChartData);
        this.showButton=true;
        this.ChartService.renderBarChart(this.chartdata.filterTransactions);
      }
  
      if (data.chartType == 'pie') {
        this.pieChartData = this.chartdata.allfilterTransactions;
        this.showButton=true;
        this.ChartService.renderPiChar(this.chartdata.filterTransactions);
      }
  
      if (data.chartType == 'line') {
        this.lineChartData = this.chartdata.allfilterTransactions;
        this.showButton=true;
        this.ChartService.renderLineChart(this.chartdata.filterTransactions);
      }
    });
  }

  downloadBarChartData() {
    if (this.barChartData){
      this.downloadData(this.barChartData, 'Expanse type');
     if(this.receivedData.type==="FILTER_TXN_BY_EXPANSE") {
      this.downloadData(this.barChartData, 'Expanse type');
     }if(this.receivedData.type==="FILTER_TXN_BY_CARD") {
      this.downloadData(this.barChartData, 'Card type');
     }if(this.receivedData.type==="FILTER_TXN_BY_GENDER"){
     this.downloadData(this.barChartData, 'Gender type');
    }if(this.filterParam==="FILTER_TXN_BY_Institute"){
      this.downloadData(this.barChartData, 'institute type');
    }
  }
  }
  
  downloadPieChartData() {
    if (this.pieChartData) {
      if( this.receivedData.type=="FILTER_TXN_BY_EXPANSE") {
        this.downloadData(this.pieChartData, 'Expanse type');
       }if( this.receivedData.type=="FILTER_TXN_BY_CARD") {
        this.downloadData(this.pieChartData, 'Card type');
       }if( this.receivedData.type=="FILTER_TXN_BY_GENDER"){
        this.downloadData(this.pieChartData, 'Gender type');
      }if(this.filterParam=="FILTER_TXN_BY_Institute"){
        this.downloadData(this.pieChartData, 'institute type');
      }
    }
  }
  
  downloadLineChartData() {
    if (this.lineChartData) {
      if( this.receivedData.type=="FILTER_TXN_BY_EXPANSE") {
        this.downloadData(this.lineChartData, 'Expanse type');
       }if( this.receivedData.type=="FILTER_TXN_BY_CARD") {
        this.downloadData(this.lineChartData, 'Card type');
       }if( this.receivedData.type=="FILTER_TXN_BY_GENDER"){
        this.downloadData(this.lineChartData, 'Gender type');
      }if(this.filterParam=="FILTER_TXN_BY_Institute"){
        this.downloadData(this.lineChartData, 'Institute type');
      }
    }
  }


  downloadData(data: any, chartType: string) {
    var options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      title: `Transaction Analysis - ${chartType}`,
      useBom: true,
      headers: ["TRX_ID", "User_ID", "Card Type", "Amount", "Expense Type", "Bank", "City", "Gender", "Transaction Status", "From Date", "To date"]
    };
  
    new ngxCsv(data, `Datavisulization_${chartType}`, options);
  }

  setInstitutionData(instdata: any) {
    this.receivedInstitutionData = {
      fromDate: instdata.fromDate,
      toDate: instdata.toDate,
    };
    this.dataService.getbyInstitution(this.receivedInstitutionData).subscribe((results) => {
      this.institutionchartdata = results;
      // console.log(this.institutionchartdata);
     this.filterParam="FILTER_TXN_BY_Institute";
      if (instdata.chartType == 'bar') {
        this.barChartData = this.institutionchartdata.allfilterTransactions;
        this.showButton=true;
        this.ChartService.renderBarChart(this.institutionchartdata.filterTransactions);
      }
      if (instdata.chartType == 'pie') {
        this.pieChartData = this.institutionchartdata.allfilterTransactions;
        this.showButton=true;
        this.ChartService.renderPiChar(this.institutionchartdata.filterTransactions);
      }
      if (instdata.chartType == 'line') {
        this.lineChartData = this.institutionchartdata.allfilterTransactions;
        this.showButton=true;
        this.ChartService.renderLineChart(this.institutionchartdata.filterTransactions);
      }
    });
  }
}
