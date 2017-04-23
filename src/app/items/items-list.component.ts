import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ItemsService } from "./items.service";

import { Item } from './item.model';

@Component({
  selector: 'app-items',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit {

  items: Item[] = [];

  constructor(private route: ActivatedRoute, 
              private itemsService: ItemsService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(
      (queryParams) => {
          this.items = this.itemsService.getItems(queryParams);
      }
    );

  }

}
