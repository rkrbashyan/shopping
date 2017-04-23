import { Component, OnInit, Input } from '@angular/core';
import { CartService } from "../../cart/cart.service";
import { Item } from '../item.model';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input() item : Item; 

  constructor(private cartService: CartService) { }

  ngOnInit() {
  }

  onOrder() {
    this.cartService.addItem(this.item);
  }

}
