import { Component, OnInit } from '@angular/core';
import { ToastrsService } from 'src/app/services/toastrs.service';
import { ProductService } from '../../../../services/product.service';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  totalProducts = 0;
  products = [];

  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales'];
  public pieChartData: SingleDataSet = [300, 500, 100];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(
    private productService: ProductService,
    private toastrService: ToastrsService
  ) { }

  ngOnInit(): void {
    this.dashboard();
  }

  async dashboard() {
    try {
      const res: any = await this.productService.getProducts();
      console.log(res);
      this.totalProducts = res.count;
      this.products = res.data;
      res.data.forEach(product => {
        this.pieChartLabels.push([product.name, product.category]);
        this.pieChartData.push([product.stock]);
      });
      monkeyPatchChartJsTooltip();
      monkeyPatchChartJsLegend();

      this.toastrService.success("Dashboard");
    } catch (error: any) {
      this.toastrService.error("Productos no encontrados");
    }
  }

}
