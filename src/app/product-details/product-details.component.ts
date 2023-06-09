import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../services/product-service/product-service.service';
import { WorkingService } from '../services/working-service/working.service';
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
  proSize: any;
  allProducts: any;
  myVar: any;
  inputEmail: string;
  inputName: string;
  inputReview: boolean;
  constructor(private prdSrvc: ProductServiceService, private wrSrvc: WorkingService) { }

  ngOnInit(): void {
    // this.prod = [];
    this.proSize = "xl";
    this.prod = [JSON.parse(localStorage.getItem('detPro'))]
    this.prod.forEach(pro => pro.price = pro.xlSize)
    this.prod.forEach(pro => {
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
    console.log(this.prod)
    this.allProducts = this.prdSrvc.getLocalStorageProducts();
    // this.prod.forEach(pro => pro.price = (pro.price).toFixed(2));
    this.cartProducts = [];
    this.localdata = [];
    // this.reviews = [];
    this.getLocalStorage();
    // this.getLocalStorageRev();
    this.cartProducts = this.localdata ? this.localdata : this.cartProducts;
    // this.prod.forEach(pro => pro.reviews = this.localReview ? this.localReview : [])
    // this.reviews = this.prod.reviews;

    // this.reviews = JSON.parse(localStorage.getItem('srPrd'))
    // this.prod.forEach(pro => this.reviews = pro.reviews ? pro.reviews : [])
    this.prod.forEach(pro => pro.curSize = this.proSize)
    this.myVar = JSON.parse(localStorage.getItem('allReviewsLocal'))
    console.log(this.myVar)
    this.prod.forEach(prodt => {
      this.myVar.forEach(prod => {
        if (prod.productId === prodt.productId) {
          this.reviews = prod.reviews;
        }
      })
    })
    this.cartProducts.forEach(pro => pro.cartPrice = pro.price * pro.quantity);
    this.inputEmail = 'true';
    this.inputReview = true;
    this.inputName = 'true';
  }
  submit_review(prodt, e, r, n) {
    if (!e.value || !r.value || !n.value) {
      if (!e.value) this.inputEmail = 'false';
      if (!r.value) this.inputReview = false;
      if (!n.value) this.inputName = 'false';
      console.log('condition 1')
      return
    }
    else {
      const checkEmail = /^[A-Za-z._0-9]{3,}@[A-Za-z.]{3,}[A-Za-z]$/
      const checkName = /^[A-Za-z A-Za-z]{3,}$/
      if (checkName.test(n.value)) {
        this.inputEmail = 'true';
        this.inputReview = true;
        this.inputName = 'true';
        console.log('condition 2')
        if (!checkEmail.test(e.value)) {
          this.inputEmail = 'error'
          return
        }
        this.myDate = new Intl.DateTimeFormat('en-IN', { dateStyle: 'long', timeStyle: 'short' }).format(new Date);
        this.myVar = JSON.parse(localStorage.getItem('allReviewsLocal'))
        this.myVar.forEach(prod => {
          if (prod.productId === prodt.productId) {
            prod.reviews.push({ review: r.value, email: e.value, name: n.value, date: this.myDate })
            if (prod.reviews.length > 4) prod.reviews.shift();
            this.reviews = prod.reviews;
          }
        })
        localStorage.setItem('allReviewsLocal', JSON.stringify(this.myVar));
        e.value = ''
        r.value = ''
        n.value = ''
      }
      else {
        console.log('condition 3')
        this.inputName = 'error';
        return

      }
    }
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
  goToCart() {
    this.wrSrvc.scrollTop()
  }
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

  //Filter by Size
  filterSize(pro, size) {
    this.prdSrvc.filterSize(pro, size)
    this.proSize = this.prdSrvc.proSize;
  }
}
