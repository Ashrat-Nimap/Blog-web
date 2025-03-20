import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BlogServiceService } from '../service/blog-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
  userId! : number
  constructor(private blogService : BlogServiceService,private router : Router) {}

  loginfrom = new FormGroup({
    username : new FormControl(),
    password : new FormControl()
  })


  onlogin(){
    this.blogService.userLogin(this.loginfrom.value).subscribe((res)=>{
      this.router.navigate(['/blog']),
      localStorage.setItem("token",res.token);
      localStorage.setItem("username",this.loginfrom.get('username')?.value)
    })
  }

}
