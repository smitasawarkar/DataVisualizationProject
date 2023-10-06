import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TransactionDetails } from '../Models/transactionDetails';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TranscationServiceService {
  private baseUrl = environment.baseUrl + '/transaction';
  private getAllTransactionsUrl  = this.baseUrl + '/getAllTxns';
   private addNewProductUrl = this.baseUrl + '/create';
   private UpdateTransactionUrl =this.baseUrl + '/updateTxn'
  private getTransactions = this.baseUrl + '/getTxnById';
  private getTransactionsbyuser = this.baseUrl + '/getByUserID';
  private deleteUrl = this.baseUrl + '/deleteTxn';
  transactions: TransactionDetails[] = [];

  constructor(private http: HttpClient) {}

  addProduct(newProduct: any) {
    return this.http.post<TransactionDetails>(
      this.addNewProductUrl,
      newProduct
    );
  }
  updateProduct(updatedProduct: any) {
     const UpdateTxnUrl = `${this.UpdateTransactionUrl}/${updatedProduct.txnId}`;
    return this.http.put<TransactionDetails>(
      UpdateTxnUrl,
      updatedProduct
    );
  }

  deletePrdouct(txnId: number) {
    const deleteUrlWithId = `${this.deleteUrl}/${txnId}`;
    return this.http.delete<any>(deleteUrlWithId);
  }
  getAllTransactionDetails() {
    // const getTranscationsUrl = `${this.getTransactions}/${userId}`;
    // return this.http.get<TransactionDetails[]>(getTranscationsUrl);

    return this.http.get<TransactionDetails[]>(this.getAllTransactionsUrl);
  }
  getTransactionDetailsByUser(userId: any) {
    const getTranscationsUrl = `${this.getTransactionsbyuser}/${userId}`;
    return this.http.get<TransactionDetails[]>(getTranscationsUrl);

  }
  getTransactionDetails() {
    return this.transactions;
  }

  setTransactionDetails(transactions: TransactionDetails[]) {
    this.transactions = transactions;
  }

  getSummary(){
    const getSummaryURL = `${this.baseUrl}/summary`;
    return this.http.get<any>(getSummaryURL);
  }
}
