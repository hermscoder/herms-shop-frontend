import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Product } from '../common/product';
import { Observable } from 'rxjs';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api';
  private productUrl = `${this.baseUrl}/products`;
  private categoryUrl = `${this.baseUrl}/product-category`;

  constructor(private httpClient: HttpClient) { }


  getProductList(): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(this.productUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getProductListByCategory(categoryId: number): Observable<Product[]> {
    const searchUrl = `${this.productUrl}/search/findByCategoryId?id=${categoryId}`
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  searchProducts(keyword: string): Observable<Product[]> {
    const searchUrl = `${this.productUrl}/search/findByNameContaining?name=${keyword}`
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }

}

interface GetResponseProducts {
  _embedded: {
    products: Product[]
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[]
  }
}
