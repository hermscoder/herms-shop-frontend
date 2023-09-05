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
      this.currentCategoryId = +this.route.snapshot.params['id'];
      this.currentCategoryName = this.route.snapshot.params['name'];

      this.productService.getProductListByCategory(this.currentCategoryId).subscribe(
        data => { this.products = data }
      )
    } else {
      this.productService.getProductList().subscribe(
        data => { this.products = data }
      );
    }
  }
}
