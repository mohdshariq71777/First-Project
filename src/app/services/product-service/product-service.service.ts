import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  proSize: string;
  // products:any;
  private _jsonUrl: string
  _jsonURL = '../../../assets/json/products.json';
  constructor(private http: HttpClient) {
    // this.products = this.getLocalStorageProducts()
  }
  getProductsJSON(): Observable<any> {
    return this.http.get(this._jsonURL);
  }
  // products = [
  //   { article: 101, category: 'shoes', sizes: ['xl', 'l'], colors: ['green', 'blue', 'red'], price: 3299, desc: 'Puma Punch Comfort Unisex Sneakers', imgs: ['product1-slider1.png', 'product1-slider2.png', 'product1-slider3.png', 'product1-slider4.png'], reviews: [] },
  //   { article: 105, category: 'shoes', sizes: ['xl'], colors: ['sultan', 'black', 'red'], price: 10999, desc: 'RS-X Reinvention Unisex Sneakers', imgs: ['product5-slider1.png', 'product5-slider2.png', 'product5-slider3.png', 'product5-slider4.png'], reviews: [] },
  //   { article: 103, category: 'shoes', sizes: ['l', 'm'], colors: ['green', 'violet', 'red'], price: 6099, desc: 'TRC Blaze Memphis Unisex Sneakers', imgs: ['product3-slider1.png', 'product3-slider2.png', 'product3-slider3.png', 'product3-slider4.png'], reviews: [] },
  //   { article: 104, category: 'shoes', sizes: ['l', 'm'], colors: ['yellow', 'blue', 'orange'], price: 5779, desc: 'one8 Virat Kohli Fuse 2.0 Camo Unisex Training Shoes', imgs: ['product4-slider1.png', 'product4-slider2.png', 'product4-slider3.png', 'product4-slider4.png'], reviews: [] },
  //   { article: 102, category: 'tee', sizes: ['l', 'm'], colors: ['yellow', 'blue', 'orange'], price: 1829, desc: `PUMA Short Sleeves Men's Training T-Shirt`, imgs: ['product2-slider1.png', 'product2-slider2.png', 'product2-slider3.png', 'product2-slider4.png'], reviews: [] },
  //   { article: 106, category: 'shoes', sizes: ['l'], colors: ['green', 'ten', 'red'], price: 6199, desc: 'Mercedes AMG Petronas F1 Maco SL Unisex Sneakers', imgs: ['product6-slider1.png', 'product6-slider2.png', 'product6-slider3.png', 'product6-slider4.png'], reviews: [] },
  //   {
  //     article: 107, category: 'shoes', sizes: ['m'], colors: ['green', 'blue', 'red'], price: 2999, desc: "Scorch Runner V2 Men's Shoes", imgs: ['product7-slider1.png', 'product7-slider2.png', 'product7-slider3.png', 'product7-slider4.png'], reviews: []
  //   },
  //   { article: 108, category: 'shoes', sizes: ['xl', 'l', 'm'], colors: ['green', 'blue', 'red'], price: 1399, desc: 'Extent Nitro RE: Escape Unisex Sneakers', imgs: ['product8-slider1.png', 'product8-slider2.png', 'product8-slider3.png', 'product8-slider4.png'], reviews: [] },
  //   { article: 109, category: 'tee', sizes: ['l', 'm'], colors: ['green', 'blue', 'red'], price: 1399, desc: `One8 Virat Kohli Graphic Slim Fit Men's T-Shirt`, imgs: ['product9-slider1.png', 'product9-slider2.png', 'product9-slider3.png', 'product9-slider4.png'], reviews: [] },
  //   { article: 110, category: 'tee', sizes: ['xl', 'l', 'm'], colors: ['green', 'blue', 'red'], price: 1999, desc: `Classics Men's Oversized T-Shirt`, imgs: ['product10-slider1.png', 'product10-slider2.png', 'product10-slider3.png', 'product10-slider4.png'], reviews: [] },
  //   { article: 111, category: 'tee', sizes: ['xl', 'm'], colors: ['green', 'blue', 'red'], price: 579, desc: `Essentials Small Logo Regular Fit Men's T-shirt`, imgs: ['product11-slider1.png', 'product11-slider2.png', 'product11-slider3.png', 'product11-slider4.png'], reviews: [] },
  // ];
  filterSize(pro, size) {
    this.proSize = size;
    if (this.proSize === "xl") {
      pro.price = pro.xlSize;
      // pro.offer = (100 - (pro.xlSize / pro.mrp * 100)).toFixed(2);
    }
    if (this.proSize === "l") {
      pro.price = pro.lSize;
      // pro.offer = (100 - (pro.lSize / pro.mrp * 100)).toFixed(2);
    }
    if (this.proSize === "m") {
      pro.price = pro.mSize;
      // pro.offer = (100 - (pro.mSize / pro.mrp * 100)).toFixed(2);
    }
    if (pro.price <= 5000) {
      pro.mrp = pro.price * 1.5;
    }
    if (pro.price > 5000) {
      pro.mrp = pro.price * 1.4;
    }
    if (pro.price > 8000) {
      pro.mrp = pro.price * 1.3;
    }
    if (pro.price > 12000) {
      pro.mrp = pro.price * 1.2;
    }
    pro.offer = (100 - (pro.price / pro.mrp * 100)).toFixed(0)
  }
  detailsPage(pro) {
    if (localStorage.getItem('detPro')) localStorage.removeItem('detPro')
    localStorage.setItem('detPro', JSON.stringify(pro))
  }
  setLocalStorageCart(data) {
    localStorage.setItem('cart', JSON.stringify(data))
  }
  getLocalStorageCart() {
    return JSON.parse(localStorage.getItem('cart'))
  }
  getLocalStorageProducts() {
    return JSON.parse(localStorage.getItem('allProductsLocal'))
  }
  getLocalStorageReviews() {
    return JSON.parse(localStorage.getItem('allReviewsLocal'))
  }
}
