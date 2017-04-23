import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from "./app-routing.module";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { LocalStorageModule } from 'angular-2-local-storage';
import { SearchComponent } from './search/search.component';
import { AuthService } from "./auth/auth.service";
import { AuthGuard } from './auth/auth-guard.service';
import { ItemsListComponent } from './items/items-list.component';
import { MyDatePickerModule } from 'mydatepicker';
import { CartComponent } from './cart/cart.component';
import { ItemsService } from "./items/items.service";
import { CartService } from "./cart/cart.service";
import { ItemComponent } from './items/item/item.component';

import { DialogModule, RatingModule } from 'primeng/primeng';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    HeaderComponent,
    HomeComponent,
    PageNotFoundComponent,
    SearchComponent,
    ItemsListComponent,
    CartComponent,
    ItemComponent
  ],
  imports: [
    LocalStorageModule.withConfig({
      prefix: 'shopping-app',
      storageType: 'localStorage'
    }),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    MyDatePickerModule,
    DialogModule,
    RatingModule
  ],
  providers: [AuthService, AuthGuard, ItemsService,CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
