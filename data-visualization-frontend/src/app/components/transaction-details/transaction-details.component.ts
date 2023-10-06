import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Status, TransactionDetails } from '../../Models/transactionDetails';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranscationServiceService } from '../../services/transcation-service.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { style } from '@angular/animations';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.css'],
})
export class TransactionDetailsComponent implements OnInit, OnChanges {
  transactions: TransactionDetails[] = [];
  currentStatus=Status;
  displayAddEditModal = false;
  selectedProduct: TransactionDetails = new TransactionDetails();
  searchFilter: string = '';
  filterProperties: string[] = ['txnId'];
  isClicked: number= -1;
  user: string | null = sessionStorage.getItem('usertype'); 
  storedValue = sessionStorage.getItem('userId');

  constructor(
    private fb: FormBuilder,
    private transcationServiceService: TranscationServiceService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {}
  onRowEditInit(product: TransactionDetails) {
    //console.log(product);
  }
  ngOnInit(): void {
    
    if(this.user==='User'){
    this.transcationServiceService.getTransactionDetailsByUser(this.storedValue).subscribe(
      (response) => {
        console.log(response);
        this.transactions = response;
        this.transcationServiceService.transactions = this.transactions;
      },
      (error) => {
        console.log("dddddd",error);
        this.toastr.error(error.error.error);
      }
    );
  }else{
    this.transcationServiceService.getAllTransactionDetails().subscribe(
      (response) => {
        console.log(response);
        this.transactions = response;
        this.transcationServiceService.transactions = this.transactions;
      },
      (error) => {
        console.log("dddddd",error);
        this.toastr.error(error.error.error);
      }
    );
  }
}

  deleteProduct(txnId: number) {
    this.isClicked = txnId;
    this.confirmationService.confirm({
      message: `Are you sure to delete this record with ID -  ${txnId}?`,
      accept: () => {
        this.transcationServiceService.deletePrdouct(txnId).subscribe(
          (response) => {
            const indexToDelete = this.transactions.findIndex(
              (item) => item.txnId === txnId
            );
            if (indexToDelete !== -1) {
              this.transactions.splice(indexToDelete, 1);
            }
            this.isClicked=-1;
            this.toastr.success('Transaction Deleted Successfully');
            
          },
          (error) => {
            if(error.status === 200) {
              const indexToDelete = this.transactions.findIndex(
                (item) => item.txnId === txnId
              );
              if (indexToDelete !== -1) {
                this.transactions.splice(indexToDelete, 1);
              }
              this.isClicked=-1;
              this.toastr.success('Transaction Deleted Successfully');
            } else {       
              this.isClicked=-1;
              this.toastr.error('Deletion Unsuccessfull');
            }
            
          }
        );
      },
      reject: () => {
        this.isClicked=-1;
        this.toastr.info('Deletion Cancelled');
      },
    });
  }
  showEditModal(txnId: number) {
    this.isClicked=txnId;
    this.selectedProduct = this.transactions.filter(
      (product) => product.txnId === txnId
    )[0];
    this.displayAddEditModal = true;
  }
  hideAddModal(isClosed: boolean) {
    this.displayAddEditModal = !isClosed;
    this.isClicked=-1;
  }

  showAddModal() {
    this.displayAddEditModal = true;
    this.selectedProduct = new TransactionDetails();
  }
  saveorUpdateProductList(newData: TransactionDetails) {
    if (this.selectedProduct && newData.txnId === this.selectedProduct.txnId) {
      const productIndex = this.transactions.findIndex(
        (data) => data.txnId === newData.txnId
      );
    } else {
      this.transactions.unshift(newData);
    }
    this.isClicked=-1;
  }
}
