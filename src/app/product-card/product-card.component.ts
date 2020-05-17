import { ShoppingCartService } from './../shopping-cart.service';
import { Product } from 'src/app/models/product';
import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCart } from '../models/shopping-carts';
//import { Product } from '../models/product';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart: ShoppingCart;
  constructor(private shoppingCartService: ShoppingCartService) {}
  addToCart(product: Product) {
    this.shoppingCartService.addToCart(this.product);
  }
}
