import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl: string = `${environment.baseUrl}/product`;
  constructor(private http: HttpClient) { }

  createProduct(productName:string,
    description:string ,
    quantity:number ,
  photoLinks:string,
  category:string,
  price:number){
    const token = localStorage.getItem("SuppToken")
    const url = `${this.baseUrl}/createProduct`;
    return this.http.post(url, {
  
      productName,
      description ,
      photoLinks ,
      price,
      category,
      quantity
    },{
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
  }
}
