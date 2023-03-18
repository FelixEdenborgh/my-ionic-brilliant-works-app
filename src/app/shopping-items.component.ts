import { Component, OnInit } from '@angular/core';
import { WebshopService } from './webshop.service';

interface ShoppingItem {
  id: string;
  name: string;
  price: number;
  imageUrls: string[];
  type: 'ShoppingItem';
}

interface OtherItem {
  id: string;
  name: string;
  price: number;
  imageUrls: string[];
  type: 'OtherItemType';
}

type Item = ShoppingItem | OtherItem;

@Component({
  selector: 'app-shopping-items',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title> Shopping Items </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <ion-item
          *ngFor="let shoppingItem of shoppingItems"
          [routerLink]="['/shopping-items', shoppingItem.id]"
        >
          <ion-thumbnail slot="start">
            <img [src]="shoppingItem.imageUrls[0]" />
          </ion-thumbnail>
          <ion-label>
            <h2>{{ shoppingItem.name }}</h2>
            <p>{{ shoppingItem.price | currency }}</p>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  `,
})
export class ShoppingItemsComponent implements OnInit {
  shoppingItems: ShoppingItem[] = [];

  constructor(private webshopService: WebshopService) {}

  ngOnInit() {
    this.webshopService
      .getMarketplaceByIdString('winnerheads')
      .subscribe((response: any) => {
        if (
          response &&
          response.data &&
          response.data.space &&
          response.data.space.content
        ) {
          this.shoppingItems = response.data.space.content.filter(
            (item: Item): item is ShoppingItem => item.type === 'ShoppingItem'
          );
        } else {
          console.error('Failed to retrieve shopping items from the API.');
        }
      });
  }
}
