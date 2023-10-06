import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TransactionDetailsComponent } from './components/transaction-details/transaction-details.component';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { AddeditTransactionComponent } from './components/addedit-transaction/addedit-transaction.component';
import { RouterModule} from '@angular/router';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { FilterPipe } from './pipe/filter.pipe';
import { RegistrationComponent } from './components/registration/registration.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { HeaderComponent } from './components/header/header.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { LoginComponent } from './components/login/login.component';
import { ConfirmationService } from 'primeng/api';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ChartComponent } from './components/chart/chart.component';
import { ChartInputComponent } from './components/chart-input/chart-input.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    HeaderComponent,
    ForgetPasswordComponent,
    TransactionDetailsComponent,
    AddeditTransactionComponent,
    FilterPipe,
    LoginComponent,
    TabsComponent,
    DashboardComponent,
    ChartComponent,
    ChartInputComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(), 
    HttpClientModule,
    ButtonModule,
    TableModule,
    ConfirmDialogModule,
    DropdownModule,
    DialogModule,
    CommonModule,
    RouterModule,
    AppRoutingModule,
    FormsModule
   
  ],
  providers: [ConfirmationService,CurrencyPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
