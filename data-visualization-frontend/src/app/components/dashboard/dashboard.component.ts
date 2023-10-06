import { Component, OnInit } from '@angular/core';
import { TranscationServiceService } from 'src/app/services/transcation-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public totalSpent: number;
  public txnCount: number;
  public expenseCategory: String;
  public mostUsedCard: String;
  public bankOfTheMonth: String;
  public txnStatuses: any;

  constructor(private _transactionService: TranscationServiceService) {
    this.totalSpent = 0;
    this.txnCount = 0;
    this.expenseCategory = "";
    this.mostUsedCard = "";
    this.bankOfTheMonth = "";
    this.txnStatuses = {};
  }

  ngOnInit(): void {
    this.getTxnSummary();
  }

  getTxnSummary(){
    this._transactionService.getSummary().subscribe({
      next: resp => {
        this.totalSpent = resp.totalSpent;
        this.expenseCategory = resp.expenseCategory;
        this.mostUsedCard = resp.mostUsedCard;
        this.bankOfTheMonth = resp.bankOfTheMonth;
        this.txnCount = resp.totalTransactionCount;
        this.txnStatuses = resp.txnsBasedOnStatuses;
      },
      error: err => {
        //console.log("error: ", err)
      }
    });
  }

}
