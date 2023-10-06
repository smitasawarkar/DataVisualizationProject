import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionDetailsComponent } from './components/transaction-details/transaction-details.component';
import { authGuard } from './services/auth.guard';
import { RegistrationComponent } from './components/registration/registration.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { LoginComponent } from './components/login/login.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ChartComponent } from './components/chart/chart.component';
import { homeGuard } from './services/home.guard';
import { roleGuard } from './services/role.guard';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  {path: '',redirectTo: '/signin', pathMatch: 'full'},
  {path: 'signup',component: RegistrationComponent, canActivate: [homeGuard]},
  {path: 'signin',component: LoginComponent, canActivate: [homeGuard]},
  {path: 'forget-password', component: ForgetPasswordComponent, canActivate: [homeGuard]},
  {path: 'home',component: TabsComponent,canActivate: [authGuard],
  children: [
    {path: 'transactionDetails', component: TransactionDetailsComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'gender/:filterParam', component: ChartComponent},
    {path: 'card/:filterParam', component: ChartComponent},
    {path: 'sales/:filterParam', component: ChartComponent},
    {path: 'institution/:filterParam', component: ChartComponent},
  ]
},
{path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
