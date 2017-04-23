import { AuthService } from '../auth/auth.service';
import { Subject } from "rxjs/Subject";
import { Item } from '../items/item.model';
import { CartItem } from './cart.model';
import { Injectable } from "@angular/core";

@Injectable()
export class CartService {

    items: CartItem[] = [];

    numberOfOrderedItems = new Subject<number>();
    cartItems = new Subject<CartItem[]>();

    constructor(private authService: AuthService) {}

    addItem(item: Item) {
        const findById = (e) => e.id === item.id;

        let e = this.items.find(findById);
        if (e) {
            e.qty += 1;
        } else {
            this.items.push({
                id: item.id,
                name: item.name,
                price: item.price,
                qty: 1
            });
        }
        this.numberOfOrderedItems.next(this.items.reduce((acc,cur)=> acc + cur.qty,0));
        this.cartItems.next(this.items);
    }

    clearCart() {
        this.items.length = 0;
        this.numberOfOrderedItems.next(0);
        this.cartItems.next(this.items);
    }

}


