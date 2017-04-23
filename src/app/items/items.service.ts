
import { Injectable } from "@angular/core";
import { Item } from './item.model';

@Injectable()
export class ItemsService {

    items: Item[] = [
        {
            "id": "58f5f9520b0d70f2a87263e2",
            "name": "Shirt",
            "color": "White",
            "issueDate": "April 6, 2017",
            "price": 12.8,
            "rating": 1.9,
            "inStock": true,
            "image": "assets/picks/white.jpg"
        },
        {
            "id": "58f5f9520414bb72b625a4e6",
            "name": "Trousers",
            "color": "Yellow",
            "issueDate": "January 20, 2015",
            "price": 33.42,
            "rating": 4,
            "inStock": true,
            "image": "assets/picks/yellow.jpg"
        },
        {
            "id": "58f5f9536d9318e8df95f1b4",
            "name": "Socks",
            "color": "Red",
            "issueDate": "March 29, 2016",
            "price": 63.93,
            "rating": 2.1,
            "inStock": true,
            "image": "assets/picks/red.jpg"
        },
        {
            "id": "58f5f9530fb9b481eb25e17e",
            "name": "Pants",
            "color": "Blue",
            "issueDate": "September 22, 2015",
            "price": 55.23,
            "rating": 3.4,
            "inStock": true,
            "image": "assets/picks/blue.jpg"
        },
        {
            "id": "58f5f953600f4afa03d0f608",
            "name": "Shirt",
            "color": "Green",
            "issueDate": "February 20, 2015",
            "price": 230342.62,
            "rating": 3,
            "inStock": false,
            "image": "assets/picks/green.jpg"
        },
        {
            "id": "58f5f9530debbd8ffa14fdb6",
            "name": "Socks",
            "color": "Red",
            "issueDate": "March 17, 2016",
            "price": 81.05,
            "rating": 2.5,
            "inStock": false,
            "image": "assets/picks/red.jpg"
        },
        {
            "id": "58f5f953e28636a37b003618",
            "name": "Pants",
            "color": "Blue",
            "issueDate": "October 15, 2016",
            "price": 93.92,
            "rating": 1.5,
            "inStock": false,
            "image": "assets/picks/blue.jpg"
        },
        {
            "id": "58f5f953d0e7accc507e8fae",
            "name": "Pants",
            "color": "White",
            "issueDate": "November 13, 2014",
            "price": 1089.36,
            "rating": 1.2,
            "inStock": true,
            "image": "assets/picks/white.jpg"
        },
        {
            "id": "58f5f953f9c14943212fa155",
            "name": "Pants",
            "color": "Black",
            "issueDate": "February 13, 2015",
            "price": 68.85,
            "rating": 4.7,
            "inStock": false,
            "image": "assets/picks/black.jpg"
        },
        {
            "id": "58f5f9533d7c603bbb6c7ced",
            "name": "Socks",
            "color": "Green",
            "issueDate": "December 10, 2016",
            "price": 80.82,
            "rating": 1.8,
            "inStock": false,
            "image": "assets/picks/green.jpg"
        }
    ];

    getItems(query) {

        if (Object.keys(query).length === 0 && query.constructor === Object) {
            return [];
        } else {
            return this.items.filter((item) => {
                let itemDate = new Date(item.issueDate);

                if (query.inStock && String(item.inStock) !== query.inStock) {
                    return false;
                }
                if (query.color && item.color !== query.color && query.color !== "All Colors") {
                    return false;
                }

                if (query.dateFrom && !query.dateTo && itemDate < new Date(query.dateFrom)) {
                    return false;
                }

                if (!query.dateFrom && query.dateTo && itemDate > new Date(query.dateTo)) {
                    return false;
                }

                if (query.dateFrom && query.dateTo && (itemDate < new Date(query.dateFrom)) || itemDate > new Date(query.dateTo)) {
                    return false;
                }

                if (query.priceFrom && !query.priceTo && item.price < +query.priceFrom) {
                    return false;
                }

                if (!query.priceFrom && query.priceTo && item.price > +query.priceTo) {
                    return false;
                }

                if (query.priceFrom && query.priceTo && (item.price < +query.priceFrom || item.price > +query.priceTo)) {
                    return false;
                }

                return true;
            });
        }
    }

}
