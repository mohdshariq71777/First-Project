import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { ProductServiceService } from '../services/product-service/product-service.service';
import { WorkingService } from '../services/working-service/working.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit, AfterViewChecked {
  localReviews: any;

  constructor(private prdSrvc: ProductServiceService, private wrSrvc: WorkingService) { }
  latest: any = [];
  allproducts: any;
  lSize: any;
  productXLsize: any;
  productLsize: any;
  productMsize: any;
  products: any;
  cartProducts: any;
  totalPrice: any;
  localdata: any
  proSize: string;
  dbproducts: any;
  dbReviews: any;
  checkReview: any;
  ngOnInit(): void {
    this.dbproducts = [
      { productId: 101, category: 'shoes', sizes: ['xl', 'l'], colors: ['green', 'blue', 'red'], price: 3299, desc: 'Puma Punch Comfort Unisex Sneakers', imgs: ['product1-slider1.png', 'product1-slider2.png', 'product1-slider3.png', 'product1-slider4.png'], reviews: [] },
      { productId: 105, category: 'shoes', sizes: ['xl'], colors: ['sultan', 'black', 'red'], price: 10999, desc: 'RS-X Reinvention Unisex Sneakers', imgs: ['product5-slider1.png', 'product5-slider2.png', 'product5-slider3.png', 'product5-slider4.png'], reviews: [] },
      { productId: 103, category: 'shoes', sizes: ['l', 'm'], colors: ['green', 'violet', 'red'], price: 6099, desc: 'TRC Blaze Memphis Unisex Sneakers', imgs: ['product3-slider1.png', 'product3-slider2.png', 'product3-slider3.png', 'product3-slider4.png'], reviews: [] },
      { productId: 104, category: 'shoes', sizes: ['l', 'm'], colors: ['yellow', 'blue', 'orange'], price: 5779, desc: 'one8 Virat Kohli Fuse 2.0 Camo Unisex Training Shoes', imgs: ['product4-slider1.png', 'product4-slider2.png', 'product4-slider3.png', 'product4-slider4.png'], reviews: [] },
      { productId: 102, category: 'tee', sizes: ['l', 'm'], colors: ['yellow', 'blue', 'orange'], price: 1829, desc: `PUMA Short Sleeves Men's Training T-Shirt`, imgs: ['product2-slider1.png', 'product2-slider2.png', 'product2-slider3.png', 'product2-slider4.png'], reviews: [] },
      { productId: 106, category: 'shoes', sizes: ['l'], colors: ['green', 'ten', 'red'], price: 6199, desc: 'Mercedes AMG Petronas F1 Maco SL Unisex Sneakers', imgs: ['product6-slider1.png', 'product6-slider2.png', 'product6-slider3.png', 'product6-slider4.png'], reviews: [] },
      {
        productId: 107, category: 'shoes', sizes: ['m'], colors: ['green', 'blue', 'red'], price: 2999, desc: "Scorch Runner V2 Men's Shoes", imgs: ['product7-slider1.png', 'product7-slider2.png', 'product7-slider3.png', 'product7-slider4.png'], reviews: []
      },
      { productId: 108, category: 'shoes', sizes: ['xl', 'l', 'm'], colors: ['green', 'blue', 'red'], price: 1399, desc: 'Extent Nitro RE: Escape Unisex Sneakers', imgs: ['product8-slider1.png', 'product8-slider2.png', 'product8-slider3.png', 'product8-slider4.png'], reviews: [] },
      { productId: 109, category: 'tee', sizes: ['l', 'm'], colors: ['green', 'blue', 'red'], price: 1399, desc: `One8 Virat Kohli Graphic Slim Fit Men's T-Shirt`, imgs: ['product9-slider1.png', 'product9-slider2.png', 'product9-slider3.png', 'product9-slider4.png'], reviews: [] },
      { productId: 110, category: 'tee', sizes: ['xl', 'l', 'm'], colors: ['green', 'blue', 'red'], price: 1999, desc: `Classics Men's Oversized T-Shirt`, imgs: ['product10-slider1.png', 'product10-slider2.png', 'product10-slider3.png', 'product10-slider4.png'], reviews: [] },
      { productId: 111, category: 'tee', sizes: ['xl', 'm'], colors: ['green', 'blue', 'red'], price: 579, desc: `Essentials Small Logo Regular Fit Men's T-shirt`, imgs: ['product11-slider1.png', 'product11-slider2.png', 'product11-slider3.png', 'product11-slider4.png'], reviews: [] },
    ];
    this.dbReviews = [
      { productId: 101, reviews: [] },
      { productId: 102, reviews: [] },
      { productId: 103, reviews: [] },
      { productId: 104, reviews: [] },
      { productId: 105, reviews: [] },
      { productId: 106, reviews: [] },
      { productId: 107, reviews: [] },
      { productId: 108, reviews: [] },
      { productId: 109, reviews: [] },
      { productId: 110, reviews: [] },
      { productId: 111, reviews: [] }
    ];
    // localStorage.setItem('allReviewsLocal', JSON.stringify(this.localReviews));
    this.checkReview = JSON.parse(localStorage.getItem('allReviewsLocal'))
    if (!this.checkReview) {
      localStorage.setItem('allReviewsLocal', JSON.stringify(this.dbReviews))
    }
    localStorage.setItem('allProductsLocal', JSON.stringify(this.dbproducts))
    this.cartProducts = [];
    this.localdata = [];
    // this.prdSrvc.getProductsJSON().subscribe(res => this.allproducts = res);
    // console.log(this.allproducts)
    this.allproducts = this.prdSrvc.getLocalStorageProducts();
    this.allproducts.forEach(pro => pro.xlSize = pro.price)
    this.allproducts.forEach(pro => pro.lSize = pro.price - 10)
    this.allproducts.forEach(pro => pro.mSize = pro.price - 20)
    this.allproducts.forEach(pro => pro.TitleSizes = pro.sizes.map(size => size.toUpperCase()))
    this.allproducts.forEach(pro => {
      if (pro.price <= 5000) {
        pro.mrp = pro.price * 1.5
      }
      if (pro.price > 5000) {
        pro.mrp = pro.price * 1.4
      }
      if (pro.price > 8000) {
        pro.mrp = pro.price * 1.3
      }
      if (pro.price > 12000) {
        pro.mrp = pro.price * 1.2
      }
      // pro.offer = (100 - (pro.price / pro.mrp * 100)).toFixed(2)
    })
    this.allproducts.forEach(pro => pro.quantity = 1);
    this.proSize = "xl";
    this.allproducts.forEach(pro => pro.offer = (100 - (pro.xlSize / pro.mrp * 100)).toFixed(0))
    this.allproducts.forEach(pro => pro.curSize = this.proSize)
    this.getLocalStorage()
    this.cartProducts = this.localdata ? this.localdata : this.cartProducts;
    this.cartProducts.forEach(pro => pro.cartPrice = pro.price * pro.quantity)
  }
  detailsPage(pro) {
    this.prdSrvc.detailsPage(pro)
    this.wrSrvc.scrollTop()
  }

  filterSize(pro, size) {
    this.prdSrvc.filterSize(pro, size)
    this.proSize = this.prdSrvc.proSize;
    pro.curSize = this.proSize;
  }
  filterLatest() {
    this.latest = this.allproducts.filter(pro => (pro.productId) > 104)
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
    this.totalPrice = this.cartProducts.reduce((a, pro) => pro.cartPrice + a, 0);
    const allPrices = [];
    this.setLocalStorage(this.cartProducts)
    this.cartProducts.forEach(prod => allPrices.push(Number.parseFloat(prod.cartPrice)))
    this.totalPrice = allPrices.reduce((a, pr) => (a + pr), 0);
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
  goToCart() {
    this.wrSrvc.scrollTop()
  }

  //For Local Storage
  setLocalStorage(data) {
    this.prdSrvc.setLocalStorageCart(data)
  }
  getLocalStorage() {
    this.localdata = this.prdSrvc.getLocalStorageCart()
  }
  ngAfterViewChecked(): void {

  }

}
