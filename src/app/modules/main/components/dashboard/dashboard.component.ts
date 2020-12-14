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
  public loading = false;
  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [];
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

  /**
   * Load dashboard with pie-chart
   */
  async dashboard() {
    try {
      this.loading = true;
      const res: any = await this.productService.getProducts();
      console.log(res);
      this.totalProducts = res.count;
      this.products = res.data;
      res.data.forEach(product => {
        this.pieChartLabels.push([product.name, product.category]);
        this.pieChartData.push(product.stock);
      });
      monkeyPatchChartJsTooltip();
      monkeyPatchChartJsLegend();
    } catch (error: any) {
      this.toastrService.error("Productos no encontrados");
    }
    this.loading = false;
  }

}
