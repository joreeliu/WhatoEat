import { ProductService } from './../../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataTableResource } from 'angular7-data-table';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  filteredProducts: any[];
  subscription: Subscription;
  tableResource: DataTableResource<Product>;
  items: Product[] = [];
  itemCount: number;

  constructor(private productService: ProductService) {
    this.subscription = this.productService
      .getAll()
      .pipe
      /*map((changes) => {
          return changes.map((c) => ({
            key: c.payload.key,
            value: c.payload.val(),
          }));
        })*/
      ()
      .subscribe((products) => {
        this.filteredProducts = this.products = products;
        this.initializeTable(products);
      });
    //this.subscription = this.products.subscibe(products =>this.products=products)
  }
  private initializeTable(products: Product[]) {
    this.tableResource = new DataTableResource(products);
    this.tableResource
      .query({ offset: 0 })
      .then((items) => (this.items = items));
    this.tableResource.count().then((count) => (this.itemCount = count));
  }
  reloadItems(params) {
    if (!this.tableResource) return;
    this.tableResource.query(params).then((items) => (this.items = items));
  }
  filter(query: string) {
    this.filteredProducts = query
      ? this.products.filter((p) =>
          p.title.toLowerCase().includes(query.toLowerCase())
        )
      : this.products;

    this.initializeTable(this.filteredProducts);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {}
}
