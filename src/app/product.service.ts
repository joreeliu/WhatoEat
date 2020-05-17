import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/models/product';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private db: AngularFireDatabase) {}
  create(product) {
    return this.db.list('/products').push(product);
  }

  getAll() {
    return this.db
      .list('/products')
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map(
            (a) => ({ key: a.key, ...(a.payload.val() as {}) } as Product)
          )
        )
      );
  }

  get(productId) {
    console.log(this.db.object('/products/' + productId));
    return this.db.object('/products/' + productId).valueChanges();
  }

  update(productId, product) {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId) {
    console.log('/products/' + productId);
    return this.db.object('/products/' + productId).remove();
  }
}
