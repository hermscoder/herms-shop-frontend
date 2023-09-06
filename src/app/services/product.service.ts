import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  private baseUrl = 'http://localhost:8080/api';
  private productUrl = `${this.baseUrl}/products`;
  private categoryUrl = `${this.baseUrl}/product-category`;

  constructor(private httpClient: HttpClient) { }

  getProductListByCategoryPaginate(page: number, pageSize: number, categoryId: number): Observable<GetResponseProducts> {
    const searchUrl = `${this.productUrl}/search/findByCategoryId`
      + `?id=${categoryId}&page=${page}&size=${pageSize}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  searchProducts(keyword: string): Observable<Product[]> {
    const searchUrl = `${this.productUrl}/search/findByNameContaining?name=${keyword}`
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getProduct(productId: number): Observable<Product> {
    return this.httpClient.get<Product>(`${this.productUrl}/${productId}`);
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }

}

interface GetResponseProducts {
  _embedded: {
    products: Product[],
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[]
  }
}
