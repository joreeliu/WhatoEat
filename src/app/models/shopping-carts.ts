import { Product } from 'src/app/models/product';
import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
  items: ShoppingCartItem[] = [];

  constructor(public itemsMap: { [productId: string]: ShoppingCartItem }) {
    this.itemsMap = itemsMap || {};

    for (let productId in itemsMap) {
      let item = itemsMap[productId];
      let x = new ShoppingCartItem();
      Object.assign(x, item);
      x.key = productId;
      //console.log(x.key);
      this.items.push(x);
    }
  }

  getQuantity(product: Product) {
    //console.log(this.shoppingCart);
    let item = this.itemsMap[product.key];
    console.log(this.itemsMap);
    return item ? item.quantity : 0;
  }

  get totalPrice() {
    let sum = 0;
    for (let productId in this.items) sum += this.items[productId].totalPrice;
    return sum;
  }

  get totalItemsCount() {
    let count = 0;
    for (let productId in this.itemsMap)
      count += this.itemsMap[productId].quantity;
    return count;
  }
}
