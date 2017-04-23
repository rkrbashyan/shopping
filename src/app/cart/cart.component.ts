import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from "./cart.service";
import { Subscription } from "rxjs/Subscription";
import { CartItem } from './cart.model'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

  cartItems: CartItem[] = [];
  cartSubscription: Subscription;
  total: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartSubscription = this.cartService.cartItems.subscribe(
      (data) => { this.cartItems = <CartItem[]> data; 
                  this.total = this.cartItems.reduce((acc, cur) => acc + cur.price * cur.qty, 0);
        });
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
  }

}
