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
  }
  //For Cart
  removeItem(ind, pro) {
    this.cartProducts.splice(ind, 1)
    this.getLocalStorage();
    this.localdata.splice(ind, 1)
    this.setLocalStorage(this.localdata)
    this.totalPrice = (this.totalPrice - pro.cartPrice).toFixed(2);
    pro.quantity = 1;
    pro.cartPrice = (pro.price * pro.quantity).toFixed(2);
  }
  sendIndex(i) {
    this.index = i;
  }
  removePro() {
    this.cartProducts.splice(this.index, 1)
    this.getLocalStorage();
    this.localdata.splice(this.index, 1)
    this.setLocalStorage(this.localdata)
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
  setLocalStorage(data) {
    this.prdSrvc.setLocalStorageCart(data)
  }
  getLocalStorage() {
    this.localdata = this.prdSrvc.getLocalStorageCart()
  }
}
