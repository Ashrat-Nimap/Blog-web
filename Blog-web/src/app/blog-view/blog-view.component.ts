import { Component, OnInit } from '@angular/core';
import { BlogServiceService } from '../service/blog-service.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-blog-view',
  templateUrl: './blog-view.component.html',
  styleUrl: './blog-view.component.scss'
})
export class BlogViewComponent implements OnInit{

  userId! : number
  postdatalist : any
  constructor(private blogService : BlogServiceService,private routes : ActivatedRoute){}
  postform = new FormGroup({
    post : new FormControl()
  })

  ngOnInit(): void {
    this.userId = +this.routes.snapshot.params['id'];
    this.blogService.getAllUser().subscribe((res)=>{
      this.postdatalist = res;
      console.log(this.postdatalist);
    })
  }
  
  addpost(){
    this.blogService.addPost(this.userId,this.postform.value).subscribe((res)=>{
      if(res){
        alert('Post added successful')
      }
    })
  }
}
