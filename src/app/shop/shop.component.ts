import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../services/product-service.service';

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
  constructor(private productsService: ProductServiceService) { }

  ngOnInit(): void {
    //For All Products
    this.allProducts = this.productsService.products;
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
    //For Uncategorized Products
    this.uncat = this.allProducts
    this.uncat.forEach(pro => pro.showPrice = pro.price)
    this.uncat.forEach(pro => {
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
    this.uncat.forEach(pro => pro.showMrp = pro.mrp)
    this.uncat.forEach(pro => pro.offer = (100 - (pro.showPrice / pro.showMrp * 100)).toFixed(2))
    this.uncat.forEach(pro => pro.uncatOffer = pro.offer)
    this.uncat.forEach(pro => pro.TitleSizes = pro.sizes.map(size => size.toUpperCase()))
    // this.uncat.forEach(pro => pro.sizes.forEach(size => console.log(size.toUpperCase())))

    // **Filter Popular Product**
    this.popularProducts = this.allProducts.filter(pro => pro.article > 103);
    this.popularProducts.forEach(pro => pro.showPopPrice = pro.price)
    this.popularProducts.forEach(pro => pro.showPopMrp = pro.mrp)
    this.popularProducts.forEach(pro => pro.offer = (100 - (pro.showPopPrice / pro.showPopMrp * 100)).toFixed(2))
    this.popularProducts.forEach(pro => pro.popOffer = pro.offer)


    // **Filter Top Product**
    this.topProducts = this.allProducts.filter(pro => pro.price > 280);
    this.topProducts.forEach(pro => pro.showTopPrice = pro.price)
    this.topProducts.forEach(pro => pro.showTopMrp = pro.mrp)
    this.topProducts.forEach(pro => pro.offer = (100 - (pro.showTopPrice / pro.showTopMrp * 100)).toFixed(2))
    this.topProducts.forEach(pro => pro.topOffer = pro.offer)
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
    pro.showMrp = pro.showPrice * 1.5;
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
    top.showTopMrp = top.showTopPrice * 1.5;
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
    pop.showPopMrp = pop.showPopPrice * 1.5;
  }

  // **Filter by Price**
  fByPrice(lt250, gt250, uncat) {
    if (lt250.checked) this.uncat = this.allProducts.filter(pro => pro.price <= 250)
    if (gt250.checked) this.uncat = this.allProducts.filter(pro => pro.price > 250)
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
}
