import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class DeliveryService {
  baseUrl: string = `${environment.baseUrl}/delivery`;
  baseorderUrl: string = `${environment.baseUrl}/order`;

  delivery: any;

  constructor(private http: HttpClient) {}

  getDelivery(id: string) {
    return this.http.get(this.baseUrl + '/viewdelivery/' + id);
  }

  createDelivery() {
    const url = `${this.baseUrl}/register`;
    return this.http.post(url, {});
  }
  updateInfo(id: any) {
    const url = `${this.baseUrl}/updatemyinfo/`;
    this.delivery = this.http.get(this.baseUrl + '/viewdelivery/' + id);
    return this.http.patch(url, {});
  }
  getmyDeliveryorders(query = null) {
    const url = `${this.baseorderUrl}/myordersdelivery${
      query ? `?query=${JSON.stringify(query)}` : ''
    }`;
    return this.http.get(url);
  }

  updateProductDelivering(orderId: string, productId: string, path: string) {
    const token = localStorage.getItem("DelToken")
    const url = `${this.baseorderUrl}/${path}/${orderId}`
    return this.http.patch(url, {
      product: productId,
      // deliveryStart
      // estimatedTime
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  
  getAllDeliveryOrders(status?: string) {
    const token = localStorage.getItem("DelToken")
    const url = `${this.baseorderUrl}/delivery/readAll${
      status ? `?status=${status}` : ''
    }`;
    return this.http.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
