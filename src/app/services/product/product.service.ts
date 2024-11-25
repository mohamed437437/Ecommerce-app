import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from '../constant/constant';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  // Fetches all categories
  getCategory() {
    return this.http.get(`${Constant.API_END_POINT}${Constant.METHODS.GET_ALL_CATEGORY}`);
  }

  // Fetches all products
  getProducts() {
    return this.http.get(`${Constant.API_END_POINT}${Constant.METHODS.GET_ALL_PRODUCT}`);
  }

  // Creates a new product
  saveProduct(obj: any) {
    return this.http.post(`${Constant.API_END_POINT}${Constant.METHODS.CREATE_PRODUCT}`, obj);
  }

  // Updates an existing product
  updateProduct(obj: any) {
    return this.http.post(`${Constant.API_END_POINT}${Constant.METHODS.UPDATE_PRODUCT}`, obj);
  }

  // Deletes a product by ID
  deleteProduct(id: any) {
    return this.http.delete(`${Constant.API_END_POINT}${Constant.METHODS.DELETE_PRODUCT}${id}`);
  }
}
