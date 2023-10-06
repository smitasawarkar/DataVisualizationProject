import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { TranscationServiceService } from 'src/app/services/transcation-service.service';

@Component({
  selector: 'app-chart-input',
  templateUrl: './chart-input.component.html',
  styleUrls: ['./chart-input.component.css']

})


export class ChartInputComponent {
  bank: string = '';
  startDate: string = '';
  endDate: string = '';
  filterParam: string = "";
  minEndDate: string = ''; 
  submitted: boolean = false;
  showbank: boolean = true;
 
  @Output() dataEvent = new EventEmitter<any>();
  @Input() chartName = '';


  chartForm= new FormGroup({ 
    bank:new FormControl('',Validators.required),
    startDate:new FormControl('', Validators.required),
    endDate: new FormControl ( '', Validators.required)
   
  } );
  constructor(private transaction: TranscationServiceService, private route: ActivatedRoute){
      this.route.params.subscribe((params: Params) => {
      this.filterParam = params['filterParam'];
      //console.log('chart input Filter Value:', this.filterParam);
    });
  }
  
  ngDoCheck(){
    if(this.filterParam === "wise") {
      this.showbank = false;
    }
  }

  get validatecontrol() {
    return this.chartForm.controls;
  }

  get banks(){
    
    return this.chartForm.get('bank');
  }

  updateEndDateMin() {
    if (this.startDate) {
      this.minEndDate = this.startDate;
    }
  }

  getData(){
    console.log('getData call');
    this.submitted = true;
      if(this.filterParam=="FILTER_TXN_BY_EXPANSE" || this.filterParam=="FILTER_TXN_BY_CARD" || this.filterParam=="FILTER_TXN_BY_GENDER"){
        //console.log('call if  getChartData ()');
      // this.showbank = true;
      this.getChartData() ;
      }
      else{
            this.getInstitrudeChartData();
          }
   }

  getChartData() {
    const dataToSend = {
       bank: this.bank,
       type:this.filterParam,
       chartType: this.chartName,
       fromDate: this.startDate,
       toDate: this.endDate,
      };
      this.dataEvent.emit(dataToSend);
     }
  
  getInstitrudeChartData() {
     const sendData = {
       chartType: this.chartName,
       fromDate: this.startDate,
       toDate: this.endDate,
       };
    this.dataEvent.emit(sendData);
 }

}


