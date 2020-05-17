import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../../product.service';
import { CategoryService } from './../../category.service';
import { Component, OnInit } from '@angular/core';
import { take, map } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  categories;
  product = {} as any;
  id;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {
    var res = this.categoryService.getAll();
    this.categories = res.pipe(
      map((changes) => {
        return changes.map((c) => ({
          key: c.payload.key,
          value: c.payload.val(),
        }));
      })
    );
    console.log(this.categories);
    console.log('category!');

    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    if (this.id)
      this.productService
        .get(this.id)
        .pipe(take(1))
        .subscribe((p) => {
          this.product = p;
          console.log(this.product);
        });
  }
  save(product) {
    if (this.id) this.productService.update(this.id, product);
    else this.productService.create(product);

    this.router.navigate(['/admin/products']);
  }
  delete() {
    if (!confirm('Are you sure you want to delete the product?')) return;
    //console.log(this.id);
    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }

  ngOnInit(): void {}
}
