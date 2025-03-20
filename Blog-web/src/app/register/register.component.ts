import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BlogServiceService } from '../service/blog-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  constructor(private blogService : BlogServiceService,private router : Router){}

  resgisterfrom = new FormGroup({
    username : new FormControl(),
    // email : new FormControl(),
    password : new FormControl(),
  })

  resgister(){
    this.blogService.userRegister(this.resgisterfrom.value).subscribe(() => {
      this.router.navigate(['/login']);
    })
  }

}
