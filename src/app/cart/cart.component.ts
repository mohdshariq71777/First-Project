import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../services/product-service/product-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartProducts: any;
  totalPrice: any;
  localdata: any;
  index: any;

  constructor(private prdSrvc: ProductServiceService) { }

  ngOnInit(): void {
    this.cartProducts = [];
    this.getLocalStorage()
    this.cartProducts = this.localdata ? this.localdata : this.cartProducts;
    this.cartProducts.forEach(pro => pro.cartPrice = (pro.price * pro.quantity));
    this.cartProducts.forEach(pro => pro.cartPrice = pro.price * pro.quantity)
    this.totalPrice = this.cartProducts.reduce((a, pro) => pro.cartPrice + a, 0);
    console.log(this.cartProducts)
  }
  //For Cart
  removeItem(ind, pro) {
    this.cartProducts.splice(ind, 1)
    this.getLocalStorage();
    this.localdata.splice(ind, 1)
    this.setLocalStorage(this.localdata)
    pro.quantity = 1;
    pro.cartPrice = pro.price * pro.quantity;
    this.totalPrice = this.totalPrice - pro.cartPrice;
  }
  sendIndex(i) {
    this.index = i;
  }
  removePro() {
    this.totalPrice -= this.cartProducts[this.index].cartPrice;
    this.cartProducts.splice(this.index, 1)
    this.getLocalStorage();
    this.localdata.splice(this.index, 1)
    this.setLocalStorage(this.localdata)
  }
  // clearCart() {
  //   this.totalPrice = 0;
  //   this.cartProducts.forEach(cartPro => cartPro.quantity = 1)
  //   this.cartProducts = [];
  //   localStorage.removeItem('cart');
  // }
  changeQuant(e, pro) {
    pro.cartPrice = (pro.price * pro.quantity).toFixed(2);
    const allPrices = [];
    this.cartProducts.forEach(prod => allPrices.push(Number.parseFloat(prod.cartPrice)))
    this.totalPrice = (allPrices.reduce((a, pr) => (a + pr), 0));
  };

  //For Local Storage
  setLocalStorage(data) {
    this.prdSrvc.setLocalStorageCart(data)
  }
  getLocalStorage() {
    this.localdata = this.prdSrvc.getLocalStorageCart()
  }
}
