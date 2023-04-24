import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../services/product-service/product-service.service';
import { WorkingService } from '../services/working-service/working.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  allProducts: any;
  popularProducts: any;
  topProducts: any;
  uncat: any;
  localdata: any;
  cartProducts: any;
  totalPrice: any;
  constructor(private prdSrvc: ProductServiceService, private wrSrvc: WorkingService) { }

  ngOnInit(): void {
    // this.cartProducts = [];
    this.localdata = [];
    //For All Products
    this.allProducts = this.prdSrvc.getLocalStorageProducts();
    // this.allProducts = this.prdSrvc.getProductsJSON().subscribe(res => this.allProducts = res);
    this.allProducts.forEach(pro => pro.xlSize = pro.price)
    this.allProducts.forEach(pro => pro.lSize = pro.price - 10)
    this.allProducts.forEach(pro => pro.mSize = pro.price - 20)
    this.allProducts.forEach(pro => {
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
    this.allProducts.forEach(pro => pro.offer = (100 - (pro.price / pro.mrp * 100)).toFixed(2))
    this.allProducts.forEach(pro => pro.quantity = 1);
    //For Uncategorized Products
    this.uncat = this.allProducts
    this.uncat.forEach(pro => pro.showPrice = pro.price)
    this.uncat.forEach(pro => {
      if (pro.showPrice <= 5000) {
        pro.mrp = (pro.showPrice * 1.5).toFixed(2)
      }
      if (pro.showPrice > 5000) {
        pro.mrp = (pro.showPrice * 1.4).toFixed(2)
      }
      if (pro.showPrice > 8000) {
        pro.mrp = (pro.showPrice * 1.3).toFixed(2)
      }
      if (pro.showPrice > 12000) {
        pro.mrp = (pro.showPrice * 1.2).toFixed(2)
      }
    })
    this.uncat.forEach(pro => pro.showMrp = pro.mrp)
    this.uncat.forEach(pro => pro.offer = (100 - (pro.showPrice / pro.showMrp * 100)).toFixed(2))
    this.uncat.forEach(pro => pro.uncatOffer = pro.offer)
    this.uncat.forEach(pro => pro.TitleSizes = pro.sizes.map(size => size.toUpperCase()))
    // this.uncat.forEach(pro => pro.sizes.forEach(size => console.log(size.toUpperCase())))

    // **Filter Popular Product**
    this.popularProducts = this.allProducts.filter(pro => pro.productId < 108);
    this.popularProducts.forEach(pro => pro.showPopPrice = pro.price)
    this.popularProducts.forEach(pro => pro.showPopMrp = pro.mrp)
    this.popularProducts.forEach(pro => pro.offer = (100 - (pro.showPopPrice / pro.showPopMrp * 100)).toFixed(2))
    this.popularProducts.forEach(pro => pro.popOffer = pro.offer)


    // **Filter Top Product**
    this.topProducts = this.allProducts.filter(pro => pro.price < 3000 && pro.price >= 1500);
    this.topProducts.forEach(pro => pro.showTopPrice = pro.price)
    this.topProducts.forEach(pro => pro.showTopMrp = pro.mrp)
    this.topProducts.forEach(pro => pro.offer = (100 - (pro.showTopPrice / pro.showTopMrp * 100)).toFixed(2))
    this.topProducts.forEach(pro => pro.topOffer = pro.offer)
    this.getLocalStorage()
    this.cartProducts = this.localdata ? this.localdata : [];
  }

  // **Filter by Size**
  //For Uncategorized Products
  filterSize(pro, size) {
    console.log(pro)
    if (size === "xl") {
      pro.showPrice = pro.xlSize;
      pro.uncatOffer = (100 - (pro.showPrice / pro.showMrp * 100)).toFixed(2)
    }
    if (size === "l") {
      pro.showPrice = pro.lSize;
      pro.uncatOffer = (100 - (pro.showPrice / pro.showMrp * 100)).toFixed(2)
    }
    if (size === "m") {
      pro.showPrice = pro.mSize;
      pro.uncatOffer = (100 - (pro.showPrice / pro.showMrp * 100)).toFixed(2)
    }
    if (pro.showPrice <= 5000) {
      pro.mrp = (pro.showPrice * 1.5).toFixed(2)
    }
    if (pro.showPrice > 5000) {
      pro.mrp = (pro.showPrice * 1.4).toFixed(2)
    }
    if (pro.showPrice > 8000) {
      pro.mrp = (pro.showPrice * 1.3).toFixed(2)
    }
    if (pro.showPrice > 12000) {
      pro.mrp = (pro.showPrice * 1.2).toFixed(2)
    }
    pro.showMrp = pro.mrp;
  }

  //For Top Products
  filterSizeTop(top, size) {
    if (size === "xl") {
      top.showTopPrice = top.xlSize;
      top.topOffer = (100 - (top.showTopPrice / top.showMrp * 100)).toFixed(2)
    }
    if (size === "l") {
      top.showTopPrice = top.lSize;
      top.topOffer = (100 - (top.showTopPrice / top.showMrp * 100)).toFixed(2)
    }
    if (size === "m") {
      top.showTopPrice = top.mSize;
      top.topOffer = (100 - (top.showTopPrice / top.showMrp * 100)).toFixed(2)
    }
    // Top Products MRP
    if (top.showTopPrice <= 5000) {
      top.mrp = (top.showTopPrice * 1.5).toFixed(2)
    }
    if (top.showTopPrice > 5000) {
      top.mrp = (top.showTopPrice * 1.4).toFixed(2)
    }
    if (top.showTopPrice > 8000) {
      top.mrp = (top.showTopPrice * 1.3).toFixed(2)
    }
    if (top.showTopPrice > 12000) {
      top.mrp = (top.showTopPrice * 1.2).toFixed(2)
    }
    top.showTopMrp = top.mrp;
  }

  //For Popular Products
  filterSizePop(pop, size) {
    if (size === "xl") {
      pop.showPopPrice = pop.xlSize;
      pop.popOffer = (100 - (pop.showPopPrice / pop.showMrp * 100)).toFixed(2)
    }
    if (size === "l") {
      pop.showPopPrice = pop.lSize;
      pop.popOffer = (100 - (pop.showPopPrice / pop.showMrp * 100)).toFixed(2)
    }
    if (size === "m") {
      pop.showPopPrice = pop.mSize;
      pop.popOffer = (100 - (pop.showPopPrice / pop.showMrp * 100)).toFixed(2)
    }
    // Popular Products MRP
    if (pop.showPopPrice <= 5000) {
      pop.mrp = (pop.showPopPrice * 1.5).toFixed(2)
    }
    if (pop.showPopPrice > 5000) {
      pop.mrp = (pop.showPopPrice * 1.4).toFixed(2)
    }
    if (pop.showPopPrice > 8000) {
      pop.mrp = (pop.showPopPrice * 1.3).toFixed(2)
    }
    if (pop.showPopPrice > 12000) {
      pop.mrp = (pop.showPopPrice * 1.2).toFixed(2)
    }
    pop.showPopMrp = pop.mrp;
  }

  // **Filter by Price**
  fByPrice(u5k, u10k, a10k, uncat) {
    if (u5k.checked) this.uncat = this.allProducts.filter(pro => pro.price <= 5000)
    if (u10k.checked) this.uncat = this.allProducts.filter(pro => pro.price <= 10000)
    if (a10k.checked) this.uncat = this.allProducts.filter(pro => pro.price > 10000)
    if (uncat.checked) this.uncat = this.allProducts;
  }
  fByType(tee, shoes, both) {
    if (tee.checked) this.uncat = this.allProducts.filter(pro => pro.category === "tee")
    if (shoes.checked) this.uncat = this.allProducts.filter(pro => pro.category === "shoes")
    if (both.checked) this.uncat = this.allProducts.map(pro => pro)
  }
  fBySizes(xl, l, m, all) {
    if (xl.checked) this.uncat = this.allProducts.filter(pro => pro.sizes.includes("xl"))
    if (l.checked) this.uncat = this.allProducts.filter(pro => pro.sizes.includes("l"))
    if (m.checked) this.uncat = this.allProducts.filter(pro => pro.sizes.includes("m"))
    if (all.checked) this.uncat = this.allProducts.filter(pro => pro)
  }

  //For Cart
  addToCart(pro) {
    if (!this.cartProducts.includes(pro)) {
      this.cartProducts.push(pro);
    }
    else {
      pro.quantity++;
    }
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

  //For Local Storage
  setLocalStorage(data) {
    this.prdSrvc.setLocalStorageCart(data)
  }
  getLocalStorage() {
    this.localdata = this.prdSrvc.getLocalStorageCart()
  }

  //Details Page
  detailsPage(pro) {
    this.prdSrvc.detailsPage(pro)
    this.wrSrvc.scrollTop()
  }
}
