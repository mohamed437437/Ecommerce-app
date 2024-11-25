import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../services/product/product.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  isSidePanelVisible: boolean = false;
  productObj: any = {
    productId: 0,
    productSKU: "",
    productName: "",
    productPrice: 0,
    productShortName: "",
    productDescription: "",
    createdDate: new Date(),
    deliveryTimeSpan: "",
    categoryId: 0,
    productImageUrl: ""
  };
  categoryList: any[] = [];
  productsList: any[] = [];
  sanitizedImageUrls: { [key: number]: SafeUrl } = {};

  constructor(private productSrv: ProductService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getProducts();
    this.getAllCategory();
  }

  getProducts() {
    this.productSrv.getProducts().subscribe((res: any) => {
      this.productsList = res.data;
      // Sanitize all image URLs
      this.productsList.forEach(product => {
        this.sanitizedImageUrls[product.productId] = this.sanitizeUrl(product.productImageUrl);
      });
    }, (err: any) => {
      console.error('Error fetching products:', err);
      alert('Error fetching products');
    });
  }

  getAllCategory() {
    this.productSrv.getCategory().subscribe((res: any) => {
      this.categoryList = res.data;
    }, (err: any) => {
      console.error('Error fetching categories:', err);
      alert('Error fetching categories');
    });
  }

  sanitizeUrl(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  onSave() {
    this.productSrv.saveProduct(this.productObj).subscribe((res: any) => {
      if (res.result) {
        alert("Product Created Successfully");
        this.getProducts();
        this.closeSidePanel();
      } else {
        alert(res.message);
      }
    }, (err: any) => {
      console.error('Error creating product:', err);
      alert('Error creating product');
    });
  }

  onUpdate() {
    this.productSrv.updateProduct(this.productObj).subscribe((res: any) => {
      if (res.result) {
        alert("Product Updated Successfully");
        this.getProducts();
        this.closeSidePanel();
      } else {
        alert(res.message);
      }
    }, (err: any) => {
      console.error('Error updating product:', err);
      alert('Error updating product');
    });
  }

  onDelete(item: any) {
    const isDelete = confirm('Are you sure you want to delete this product?');
    if (isDelete) {
      this.productSrv.deleteProduct(item.productId).subscribe((res: any) => {
        if (res.result) {
          alert("Product Deleted Successfully");
          this.getProducts();
        } else {
          alert(res.message);
        }
      }, (err: any) => {
        console.error('Error deleting product:', err);
        alert('Error deleting product');
      });
    }
  }

  onEdit(item: any) {
    this.productObj = { ...item }; // Ensure deep copy to avoid direct mutation
    this.openSidePanel();
  }

  openSidePanel() {
    this.isSidePanelVisible = true;
  }

  closeSidePanel() {
    this.isSidePanelVisible = false;
    this.resetForm(); // Reset the form when closing the side panel
  }

  resetForm(): void {
    this.productObj = {
      productId: 0,
      productSKU: "",
      productName: "",
      productPrice: 0,
      productShortName: "",
      productDescription: "",
      createdDate: new Date(),
      deliveryTimeSpan: "",
      categoryId: 0,
      productImageUrl: ""
    };
  }
}
