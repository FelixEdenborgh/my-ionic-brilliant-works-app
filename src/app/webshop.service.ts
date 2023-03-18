import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WebshopService {
  private apiUrl =
    'https://api.winnerheads.com/api/marketplace/getMarketplaceByIdString/winnerheads';

  constructor(private http: HttpClient) {}

  getMarketplaceByIdString(id: string) {
    return this.http.get(
      `${this.apiUrl}/marketplace/getMarketplaceByIdString/${id}`
    );
  }

  getShopItemById(id: number) {
    return this.http.get(`${this.apiUrl}/shopitems/${id}`);
  }
}
