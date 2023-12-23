import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'Navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private loginSer: LoginService, private router: Router) {}
  name: string = '';

  ngOnInit(): void {
    const userData = JSON.parse(localStorage.getItem("userData") || '{}')
    this.name = userData?.name || 'Edset Member'
  }

  navToLogin() {
    this.loginSer.clearUserData();
    this.router.navigateByUrl('/');
  }

  backHome(e: Event) {
    this.router.navigate([environment.role])
  }

  logout(event: Event) {
    this.loginSer.logout().subscribe(
      (res) => {
        this.navToLogin();
      },
      (err) => {
        console.log(err);
        this.navToLogin();
      }
    );
  }
}
