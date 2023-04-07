import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  proSize: string;
  constructor() { }
  products = [
    { article: 101, category: 'shoes', sizes: ['xl', 'l'], colors: ['green', 'blue', 'red'], price: 3299, desc: 'Puma Punch Comfort Unisex Sneakers', imgs: ['product1-slider1.png', 'product1-slider2.png', 'product1-slider3.png', 'product1-slider4.png'] },
    { article: 105, category: 'shoes', sizes: ['xl'], colors: ['sultan', 'black', 'red'], price: 10999, desc: 'RS-X Reinvention Unisex Sneakers', imgs: ['product5-slider1.png', 'product5-slider2.png', 'product5-slider3.png', 'product5-slider4.png',] },
    { article: 103, category: 'shoes', sizes: ['l', 'm'], colors: ['green', 'violet', 'red'], price: 6099, desc: 'TRC Blaze Memphis Unisex Sneakers', imgs: ['product3-slider1.png', 'product3-slider2.png', 'product3-slider3.png', 'product3-slider4.png'] },
    { article: 104, category: 'shoes', sizes: ['l', 'm'], colors: ['yellow', 'blue', 'orange'], price: 5779, desc: 'one8 Virat Kohli Fuse 2.0 Camo Unisex Training Shoes', imgs: ['product4-slider1.png', 'product4-slider2.png', 'product4-slider3.png', 'product4-slider4.png'] },
    { article: 102, category: 'shoes', sizes: ['l', 'm'], colors: ['yellow', 'blue', 'orange'], price: 5779, desc: `PUMA Short Sleeves Men's Training T-Shirt`, imgs: ['product2-slider1.png', 'product2-slider2.png', 'product2-slider3.png', 'product2-slider4.png'] },
    { article: 106, category: 'shoes', sizes: ['l'], colors: ['green', 'ten', 'red'], price: 6199, desc: 'Mercedes AMG Petronas F1 Maco SL Unisex Sneakers', imgs: ['product6-slider1.png', 'product6-slider2.png', 'product6-slider3.png', 'product6-slider4.png'] },
    {
      article: 107, category: 'shoes', sizes: ['m'], colors: ['green', 'blue', 'red'], price: 2999, desc: "Scorch Runner V2 Men's Shoes", imgs: ['product7-slider1.png', 'product7-slider2.png', 'product7-slider3.png', 'product7-slider4.png']
    },
    { article: 108, category: 'shoes', sizes: ['xl', 'l', 'm'], colors: ['green', 'blue', 'red'], price: 1399, desc: 'Extent Nitro RE: Escape Unisex Sneakers', imgs: ['product8-slider1.png', 'product8-slider2.png', 'product8-slider3.png', 'product8-slider4.png'] },
    { article: 109, category: 'tee', sizes: ['xl', 'm'], colors: ['green', 'blue', 'red'], price: 1099, desc: 'CR Band collar Polo', imgs: ['product9-slider1.png'] },
    { article: 110, category: 'tee', sizes: ['l', 'm'], colors: ['green', 'blue', 'red'], price: 1999, desc: "RTG Men's T-Shirt", imgs: ['product10-slider1.png'] },
  ];
  filterSize(pro, size) {
    this.proSize = size;
    if (this.proSize === "xl") {
      pro.price = pro.xlSize;
      pro.offer = (100 - (pro.xlSize / pro.mrp * 100)).toFixed(2)
    }
    if (this.proSize === "l") {
      pro.price = pro.lSize;
      pro.offer = (100 - (pro.lSize / pro.mrp * 100)).toFixed(2)
    }
    if (this.proSize === "m") {
      pro.price = pro.mSize;
      pro.offer = (100 - (pro.mSize / pro.mrp * 100)).toFixed(2)
    }
    pro.price = pro.price.toFixed(2)
    if (pro.price <= 5000) {
      pro.mrp = (pro.price * 1.5).toFixed(2)
    }
    if (pro.price > 5000) {
      pro.mrp = (pro.price * 1.4).toFixed(2)
    }
    if (pro.price > 8000) {
      pro.mrp = (pro.price * 1.3).toFixed(2)
    }
    if (pro.price > 12000) {
      pro.mrp = (pro.price * 1.2).toFixed(2)
    }
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
}
