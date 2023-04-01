import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { ProductServiceService } from '../services/product-service.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit, AfterViewChecked {

  constructor(private prdSrvc: ProductServiceService) { }
  latest: any = [];
  allproducts: any;
  lSize: any;
  productXLsize: any;
  productLsize: any;
  productMsize: any;
  products: any;
  cartProducts: any = [];
  totalPrice: any;
  localdata: any = [];
  proSize: string;
  ngOnInit(): void {
    this.allproducts = this.prdSrvc.products;
    this.allproducts.forEach(pro => pro.xlSize = pro.price)
    this.allproducts.forEach(pro => pro.lSize = pro.price - 10)
    this.allproducts.forEach(pro => pro.mSize = pro.price - 20)
    this.allproducts.forEach(pro => pro.TitleSizes = pro.sizes.map(size => size.toUpperCase()))
    this.allproducts.forEach(pro => {
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
    })
    this.allproducts.forEach(pro => pro.quantity = 1);
    this.allproducts.forEach(pro => pro.offer = (100 - (pro.price / pro.mrp * 100)).toFixed(2))
    this.proSize = "xl";
    this.allproducts.forEach(pro => pro.curSize = this.proSize)
    // this.localdata =
    this.getLocalStorage()
    if (this.localdata) {
      this.cartProducts = this.localdata;
    }
  }
  detailsPage(pro) {
    this.prdSrvc.detailsPage(pro)
  }
  addToCart(pro) {
    if (!this.cartProducts.includes(pro)) {
      this.cartProducts.push(pro);
    }
    else {
      pro.quantity++;
    }
    console.log(pro)
    pro.cartPrice = Number(pro.price * pro.quantity).toFixed(2);
    this.totalPrice = this.cartProducts.reduce((a, pro) => Number(pro.cartPrice + a).toFixed(2), 0);
    this.totalPrice = this.cartProducts.reduce((a, prod) => (Number(prod.cartPrice + a).toFixed(2)), 0)
    const allPrices = [];
    this.setLocalStorage(this.cartProducts)
    this.cartProducts.forEach(prod => allPrices.push(Number.parseFloat(prod.cartPrice)))
    this.totalPrice = (allPrices.reduce((a, pr) => (a + pr), 0)).toFixed(2);
  };
  removeItem(ind, pro) {
    this.cartProducts.splice(ind, 1)
    this.getLocalStorage();
    this.localdata.splice(ind, 1)
    this.setLocalStorage(this.localdata)
    this.totalPrice = (this.totalPrice - pro.cartPrice).toFixed(2);
    pro.quantity = 1;
    pro.cartPrice = (pro.price * pro.quantity).toFixed(2);
  }
  clearCart() {
    this.totalPrice = 0;
    this.cartProducts.forEach(cartPro => cartPro.quantity = 1)
    this.cartProducts = [];
    localStorage.removeItem('cart');
  }
  changeQuant(e, pro) {
    pro.cartPrice = (pro.price * pro.quantity).toFixed(2);
    const allPrices = [];
    this.cartProducts.forEach(prod => allPrices.push(Number.parseFloat(prod.cartPrice)))
    this.totalPrice = (allPrices.reduce((a, pr) => (a + pr), 0)).toFixed(2);
  };
  filterSize(pro, size) {
    this.prdSrvc.filterSize(pro, size)
    this.proSize = this.prdSrvc.proSize;
    console.log(this.proSize)
  }
  filterLatest() {
    this.latest = this.allproducts.filter(pro => (pro.article) > 104)
  }
  setLocalStorage(data) {
    localStorage.setItem('cart', JSON.stringify(data))
  }
  getLocalStorage() {
    this.localdata = JSON.parse(localStorage.getItem('cart'))
  }
  ngAfterViewChecked(): void {

  }

}
