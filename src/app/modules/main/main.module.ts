import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InformationComponent } from './components/information/information.component';
import { SidenavComponent } from '../../components/sidenav/sidenav.component';
import { AngularMaterialModule } from '../angular-material.module';


@NgModule({
  declarations: [MainComponent, DashboardComponent, InformationComponent, SidenavComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    AngularMaterialModule
  ]
})
export class MainModule { }
