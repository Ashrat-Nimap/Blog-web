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
    email : new FormControl(),
    password : new FormControl()
  })


  onlogin(){
    if(this.loginfrom.invalid) return;
    const {email,password} = this.loginfrom.value;
    this.blogService.getUser(email,password).subscribe((res) =>{
      if(res){
        // this.router.navigate(['/blog',this.userId]);
      }else{
        alert('invalid')
      }
    })
  }

}
