import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  baseUrl: string = `${environment.baseUrl}/supplier`;
  baseorderUrl: string = `${environment.baseUrl}/order`;

  supplier: any;

  constructor(private http: HttpClient) {}

  getSupplier(id: string) {
    return this.http.get(this.baseUrl + '/viewsupplier/' + id);
  }
  getSuppliers(search: any) {
    return this.http.get(
      this.baseUrl + `/allsuppliers${search ? `?search=${search}` : ''}`
    );
  }

  createSupplier() {
    const url = `${this.baseUrl}/register`;
    return this.http.post(url, {});
  }
  updateInfo(id: any) {
    const url = `${this.baseUrl}/updatemyinfo/`;
    this.supplier = this.http.get(this.baseUrl + '/viewsupplier/' + id);

    return this.http.patch(url, {});
  }
  getmyorders(query = null) {
    const url = `${this.baseorderUrl}/myorderssupplier${
      query ? `?query=${JSON.stringify(query)}` : ''
    }`;
    return this.http.get(url);
  }
  changeOrderStatus(orderid?: string) {
    const token = localStorage.getItem('SuppToken');
    const url = `${this.baseorderUrl}/supplier/prepareAll/${orderid}`;
    return this.http.patch(
      url,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
  getAllOrders(status?: string) {
    const token = localStorage.getItem('SuppToken');
    const url = `${this.baseorderUrl}/supplier/readAll${
      status ? `?status=${status}` : ''
    }`;
    return this.http.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
