import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../services/product-service/product-service.service';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  reviews: any = [];
  myDate: any;
  prod: any;
  cartProducts: any;
  totalPrice: any;
  localdata: any;
  localReview: any;
  options: any;
  constructor(private prdSrvc: ProductServiceService) { }

  ngOnInit(): void {
    this.prod = [JSON.parse(localStorage.getItem('detPro'))]
    this.prod.forEach(pro => pro.price = (pro.price).toFixed(2));
    this.cartProducts = [];
    this.localdata = [];
    this.reviews = [];
    this.getLocalStorage();
    this.getLocalStorageRev();
    this.cartProducts = this.localdata ? this.localdata : this.cartProducts;
    this.reviews = this.localReview ? this.localReview : this.reviews;
  }
  submit_review(r, n) {
    this.myDate = new Intl.DateTimeFormat('en-US', this.options).format(new Date);
    this.reviews.push({ review: r.value, name: n.value, date: this.myDate })
    this.options = { year: 'numeric', month: 'long', day: 'numeric' };
    if (this.reviews.length > 4) this.reviews.shift();
    this.setLocalStorageRev(this.reviews)
  }
  //For Cart
  addToCart(pro) {
    if (!this.cartProducts.includes(pro)) {
      this.cartProducts.push(pro);
    }
    else {
      pro.quantity++;
    }
    pro.cartPrice = pro.price * pro.quantity;
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
    this.totalPrice = this.totalPrice - pro.cartPrice;
    pro.quantity = 1;
    pro.cartPrice = pro.price * pro.quantity;
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

  //For Local Storage
  setLocalStorage(arr) {
    this.prdSrvc.setLocalStorageCart(arr)
  }
  getLocalStorage() {
    this.localdata = this.prdSrvc.getLocalStorageCart()
  }
  setLocalStorageRev(arr) {
    localStorage.setItem('reviews', JSON.stringify(arr))
  }
  getLocalStorageRev() {
    this.localReview = JSON.parse(localStorage.getItem('reviews'))
  }
}
