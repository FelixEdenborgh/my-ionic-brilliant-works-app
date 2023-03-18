import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval } from 'rxjs';

interface Item {
  id: string;
  name: string;
  price: number;
  imageUrls: string[];
  type: 'ShoppingItem' | 'OtherItemType';
  title: string;
  description: string;
}

interface Marketplace {
  id: string;
  idString: string;
  space: {
    content: Item[];
    id: string;
    root: boolean;
    title: string;
    title_en: string;
    description: string;
    description_en: string;
  };
  name: string;
  description: string;
}

@Component({
  selector: 'app-root',
  template: `
    <div *ngIf="this.marketplace">
      <pre>{{ marketplace | json }}</pre>
      <div *ngFor="let item of marketplace.space.content">
        <h2>{{ item.title }}</h2>
        <p>{{ item.description }}</p>
      </div>
    </div>

    <div *ngIf="!marketplace">
      <p>Loading...</p>
      <pre>{{ marketplace }}</pre>
      <pre>{{ marketplace | json }}</pre>
    </div>
  `,
})
export class AppComponent {
  marketplace: Marketplace | null = null;

  constructor(private http: HttpClient) {
    console.log('AppComponent constructor called');
  }

  ngOnInit() {
    const source = interval(1000); // Make a request every 1 second
    const subscribe = source.subscribe(() => this.makeRequest());
  }

  makeRequest() {
    console.log('Making HTTP request...');
    this.http
      .get(
        'https://api.winnerheads.com/api/marketplace/getMarketplaceByIdString/winnerheads'
      )
      .subscribe(
        (response: any) => {
          console.log('Received response:', response);
          this.marketplace = response;
          console.log('Marketplace:', this.marketplace);
          console.log('Marketplace Type:', typeof this.marketplace);
          console.log('Type of marketplace:', typeof this.marketplace);
          console.log('Is marketplace null?', this.marketplace === null);
        },
        (error: any) => {
          console.log('Error:', error);
        }
      );
  }
}
