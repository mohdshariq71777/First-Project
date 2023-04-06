import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { ProductServiceService } from './services/product-service/product-service.service';
import { ShopComponent } from './shop/shop.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { HttpClientModule } from '@angular/common/http'
import { WorkingService } from './services/working-service/working.service';
const approutes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'product-details', component: ProductDetailsComponent }
]
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomepageComponent,
    AboutUsComponent,
    ShopComponent,
    ProductDetailsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(approutes),
    FormsModule,
    HttpClientModule

  ],
  providers: [ProductServiceService, WorkingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
