import { TypesService } from './../types.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'type-card',
  templateUrl: './type-card.component.html',
  styleUrls: ['./type-card.component.css'],
})
export class TypeCardComponent {
  types = [];

  constructor(typesService: TypesService) {
    this.types = typesService.getTypes().pipe(
      map((changes) => {
        return changes.map((c) => ({
          key: c.payload.key,
          value: c.payload.val(),
        }));
      })
    );
    //console.log(this.types);
  }
  selectType(type) {
    console.log(type);
  }
}
