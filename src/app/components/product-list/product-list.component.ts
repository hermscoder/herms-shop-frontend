import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number | null = null;
  currentCategoryName: string | null = '';

  pageNumber: number = 1;
  pageSize: number = 10;
  totalElements: number = 0;

  constructor(private productService: ProductService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      let oldCategoryId = this.currentCategoryId;

      this.currentCategoryId = +this.route.snapshot.params['id'];
      this.currentCategoryName = this.route.snapshot.params['name'];

      if (oldCategoryId != this.currentCategoryId) {
        this.resetPagination();
      }

      this.productService
        .getProductListByCategoryPaginate(
          this.pageNumber - 1,
          this.pageSize,
          this.currentCategoryId).subscribe(
            data => {
              this.products = data._embedded.products;
              this.pageNumber = data.page.number + 1;
              this.pageSize = data.page.size;
              this.totalElements = data.page.totalElements;
            });
    } else {
      const searchMode: boolean = this.route.snapshot.paramMap.has('keyword');
      if (searchMode) {
        const keyword = this.route.snapshot.params['keyword'];
        this.productService.searchProducts(keyword).subscribe(
          data => {
            this.products = data
          });
      }
    }
  }

  updatePageSize(newPageSize: number) {
    this.pageSize = newPageSize;
    this.resetPagination();
    this.listProducts();
  }

  resetPagination() {
    this.pageNumber = 1;
    this.totalElements = 0;
  }
}


