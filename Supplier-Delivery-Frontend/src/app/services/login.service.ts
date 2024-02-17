import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  baseUrl: string = `${environment.baseUrl}/${environment.role}`;
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    const url = `${this.baseUrl}/login`;
    return this.http.post(url, {
      email,
      password,
    });
  }

  logout() {
    const url = `${this.baseUrl}/logout`;
    const tokenName = `${environment.role === 'delivery' ? 'Del': 'Supp'}Token`;
    const token = localStorage.getItem(tokenName);
    return this.http.post(url, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  isLoggedIn() {
    const tokenName = `${environment.role === 'delivery' ? 'Del': 'Supp'}Token`
    return localStorage.getItem(tokenName)
  }

  clearUserData() {
    const tokenName = `${environment.role === 'delivery' ? 'Del': 'Supp'}Token`
    localStorage.removeItem(tokenName)
    localStorage.removeItem("userData")
  }
}
