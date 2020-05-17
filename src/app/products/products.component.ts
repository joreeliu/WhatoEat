import { ShoppingCartService } from './../shopping-cart.service';
//import { Product } from 'src/app/models/product';
import { ProductService } from './../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { map, subscribeOn } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  cart: any;
  subscription: Subscription;

  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    private shoppingCartService: ShoppingCartService
  ) {
    productService
      .getAll()
      .pipe
      /*map((actions) => {
           actions.map((c) => ({
            key: c.key,
            value: c.payload.val()
          } as Product));
        })*/
      ()
      .subscribe((products) => {
        console.log(products);
        this.products = products;
        route.queryParamMap.subscribe((params) => {
          this.category = params.get('category');
          console.log(this.category);
          this.filteredProducts = this.category
            ? this.products.filter((p) => p.category === this.category)
            : this.products;
        });
        //return route.queryParamMap;
      });
  }

  async ngOnInit() {
    this.subscription = (await this.shoppingCartService.getCart()).subscribe(
      (cart) => (this.cart = cart)
    );
    console.log(this.subscription);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
