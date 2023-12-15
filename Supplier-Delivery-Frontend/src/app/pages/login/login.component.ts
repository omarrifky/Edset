import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private loginSer: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login(e: SubmitEvent) {
    e.stopPropagation()
    e.preventDefault()
    
    const { email, password } = (e.target as any).elements;
    this.loginSer.login(email.value, password.value).subscribe((res: any) => {
      console.log(res);
      
      if(environment.role === "delivery") {
        localStorage.setItem("DelToken", res.token)
        this.router.navigateByUrl("/delivery")
      } else {
        localStorage.setItem("SuppToken", res.token)
        this.router.navigateByUrl("/supplier")
      }
    }, err => {
    })
    
  }
}
