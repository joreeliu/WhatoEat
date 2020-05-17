import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class TypesService {
  constructor(private db: AngularFireDatabase) {}
  getTypes() {
    return this.db.list('/types').snapshotChanges();
  }
}
