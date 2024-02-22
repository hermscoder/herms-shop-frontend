import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Purchase } from '../common/purchase';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  // TODO use environments to enable configurations by env, like dev, test, prod
  // private prodBaseUrl = 'https://herms-shop-api.onrender.com/api';
  private purchaseUrl = 'http://localhost:8080/api/checkout/purchase'

  constructor(private httpClient: HttpClient) { }

  placeOrder(purchase: Purchase): Observable<PurchaseResponseDto> {
    return this.httpClient.post<PurchaseResponseDto>(this.purchaseUrl, purchase);
  }
}

export class PurchaseResponseDto {
  constructor(public orderTrackingNumber: string) { }
}