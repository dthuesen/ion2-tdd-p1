import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';

@Injectable()
export class Products {

  products: any;

  constructor( public http: Http ) {}
  
  load() {

    this.http.get('assets/data/products.json')
              .map( res => res.json() )
              .subscribe( data => {
                this.products = data.products;
              });
  }

}
