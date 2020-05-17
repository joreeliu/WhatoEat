import { Product } from 'src/app/models/product';
import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css'],
})
export class ProductQuantityComponent {
  @Input('product') product: Product;
  @Input('shopping-cart') shoppingCart;

  constructor(private shoppingCartService: ShoppingCartService) {}
  addToCart(product: Product) {
    this.shoppingCartService.addToCart(product);
  }
  removeFromCart() {
    this.shoppingCartService.removeFromCart(this.product);
  }
}
