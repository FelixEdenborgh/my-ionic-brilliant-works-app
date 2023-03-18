import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { IonicModule } from '@ionic/angular';
import { AppComponent } from './app.component';
import { ShoppingItemsComponent } from './shopping-items.component';
import { WebshopService } from './webshop.service';

@NgModule({
  declarations: [AppComponent, ShoppingItemsComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [WebshopService],
  bootstrap: [AppComponent],
})
export class AppModule {}
