import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart-service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product!: Product;
  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    });
  }
  handleProductDetails() {
    const productId = +this.route.snapshot.params['id'];
    this.productService.getProduct(productId).subscribe(
      data => {
        this.product = data;
      }
    )
  }

  addToCart() {
    const newCartItem = new CartItem(this.product);
    this.cartService.addToCart(newCartItem);
  }

}
