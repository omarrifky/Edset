import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

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
      if(res.role === "delivery") {
        this.router.navigateByUrl("/delivery")
      } else {
        this.router.navigateByUrl("/supplier")
      }
    }, err => {
      const res = {
        role: "delivery"
      }
      if(res.role === "delivery") {
        this.router.navigateByUrl("/delivery")
      } else {
        this.router.navigateByUrl("/supplier")
      }
    })
    
  }
}
