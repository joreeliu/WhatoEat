import { CategoryService } from './../../category.service';
import { Component, OnInit, Input } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css'],
})
export class ProductFilterComponent implements OnInit {
  categories;
  @Input('category') category;

  constructor(categoryService: CategoryService) {
    this.categories = categoryService.getAll().pipe(
      map((changes) => {
        return changes.map((c) => ({
          key: c.payload.key,
          value: c.payload.val(),
        }));
      })
    );
  }

  ngOnInit(): void {}
}
