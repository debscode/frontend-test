import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/models';
import { ToastrsService } from 'src/app/services/toastrs.service';
import { ProductService } from '../../../../services/product.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'category', 'price', 'stock', 'actions'];
  dataSource: MatTableDataSource<Product>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private productService: ProductService,
    private toastrService: ToastrsService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.information();
  }

  /**
   * Apply filter on data table
   * @param event 
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * Load data table with response from products
   */
  async information() {
    try {
      const res: any = await this.productService.getProducts();
      this.dataSource = new MatTableDataSource(res.data);
      console.log(this.dataSource);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    } catch (error: any) {
      this.toastrService.error("Productos no encontrados");
    }
  }

  /**
   * Delete a product
   * @param id 
   */
  async delete(id) {
    try {
      const res: any = await this.productService.deleteProduct(id);
      this.toastrService.success("Producto eliminado");
      this.information();
    } catch (error: any) {
      this.toastrService.error("Productos no encontrados");
    }
  }

  /**
   * Show a dialog to edit product
   * @param id 
   */
  openDialogEdit(id): void {
    const product = this.dataSource.data.find(prod => prod.id === id);
    console.log(product);
    const dialogRef = this.dialog.open(InformationDialogComponent, {
      width: '250px',
      data: product
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.information();
      }
    });
  }

  createProduct() {
    this.openDialogEdit(null);
  }

}

@Component({
  selector: 'app-information-dialog-component',
  templateUrl: './information-dialog.html',
  styleUrls: ['./information.component.scss']
})
export class InformationDialogComponent implements OnInit {

  form: FormGroup;
  categories: string[] = ["Bebidas", "Enlatados", "Salsas", "Granos"];
  nameProduct = '';
  category = '';
  price: any = '';
  stock: any = '';
  edit = false;

  constructor(
    public dialogRef: MatDialogRef<InformationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product, private formBuilder: FormBuilder,
    private toastrService: ToastrsService,
    private productService: ProductService) { }

  ngOnInit(): void {
    if (this.data) {
      this.edit = true;
      this.nameProduct = this.data.name;
      this.category = this.data.category;
      this.price = this.data.price;
      this.stock = this.data.stock;
    }
    this.form = this.formBuilder.group({
      name: [this.nameProduct, [Validators.required]],
      category: [this.category, [Validators.required]],
      price: [this.price, [Validators.required]],
      stock: [this.stock, [Validators.required]],
    });
  }

  //not valid getters

  get nameInvalid() {
    return this.form.get('name').invalid && this.form.get('name').touched;
  }
  get categoryInvalid() {
    return this.form.get('category').invalid && this.form.get('category').touched;
  }
  get priceInvalid() {
    return this.form.get('price').invalid && this.form.get('price').touched;
  }
  get stockInvalid() {
    return this.form.get('stock').invalid && this.form.get('stock').touched;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  /**
   * send a request to update or create product
   */
  async submit() {
    if (this.form.invalid) {
      this.toastrService.error("Ingresar campos obligatorios");
      return Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      });
    }

    let id: any;
    if (this.data) {
      id = this.data.id;
    } else {
      id = null;
    }

    const request: Product = {
      id,
      name: this.form.controls.name.value,
      category: this.form.controls.category.value,
      price: this.form.controls.price.value,
      stock: this.form.controls.stock.value
    };
    try {
      if (id) {
        const res: any = await this.productService.editProduct(request);
        this.toastrService.success("Actualización exitosa");
      } else {
        const res: any = await this.productService.createProduct(request);
        this.toastrService.success("Producto creado correctamente");
      }
      this.dialogRef.close(true);
    } catch (error: any) {
      this.toastrService.error("Nombre ya existente, por favor ingresa otro");
    }

  }

}
