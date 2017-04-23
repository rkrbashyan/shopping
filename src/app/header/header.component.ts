import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs/Subscription";
import { Router } from "@angular/router";
import { CartService } from "../cart/cart.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userSubscription: Subscription;
  cartSubscription: Subscription;
  displayCart: boolean = false;

  currentUser = {
    status: 'unAuthorized',
    email: '',
    loggedIn: false
  };

  cartItemsNumber = 0;

  constructor(private authService: AuthService, private router: Router, private cartService: CartService) { }

  ngOnInit() {
    this.userSubscription = this.authService.activeUser.subscribe(
      (user) => this.currentUser = user
    );

    this.cartSubscription = this.cartService.numberOfOrderedItems.subscribe(
      (data) => this.cartItemsNumber = data
    );

  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.cartSubscription.unsubscribe();
  }

  onLogOut() {
    this.cartService.clearCart();
    this.authService.logout();
    this.router.navigate(['/']);
  }


  onCartClick() {
    this.displayCart = true;
  }


}
