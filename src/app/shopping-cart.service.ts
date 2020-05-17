import { take, subscribeOn, map } from 'rxjs/operators';
import { Product } from 'src/app/models/product';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { ShoppingCart } from './models/shopping-carts';
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase) {}

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    //console.log(this.db.object('/shopping-carts/' + cartId));
    return this.db
      .object('/shopping-carts/' + cartId)
      .valueChanges()
      .pipe(map((x) => new ShoppingCart(x.items)));
  }

  async addToCart(product: Product) {
    this.updateItem(product, 1);
  }
  async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime(),
    });
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private async updateItem(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);
    console.log(product.key);
    item$
      .valueChanges()
      .pipe(take(1))
      .subscribe((item) => {
        if (item) {
          let quantity = item.quantity + change;
          console.log(quantity);
          if (quantity === 0) item$.remove();
          else
            item$.update({
              title: product.title,
              imageUrl: product.imageUrl,
              price: product.price,
              quantity: quantity,
            });
        } else
          item$.set({
            title: product.title,
            imageUrl: product.imageUrl,
            price: product.price,
            quantity: 1,
          });
      });
  }
}
