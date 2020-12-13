import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InformationComponent, InformationDialogComponent } from './components/information/information.component';
import { SidenavComponent } from '../../components/sidenav/sidenav.component';
import { AngularMaterialModule } from '../angular-material.module';
import { ChartsModule } from 'ng2-charts';
import { UserComponent } from './components/user/user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [MainComponent, DashboardComponent, InformationComponent, SidenavComponent, UserComponent, InformationDialogComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    AngularMaterialModule,
    ChartsModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class MainModule { }
