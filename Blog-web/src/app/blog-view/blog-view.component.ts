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
  username: any;
  constructor(private blogService : BlogServiceService,private routes : ActivatedRoute){}
  postform = new FormGroup({
    title : new FormControl(),
    content : new FormControl()
  })

  ngOnInit(): void {
    this.getAllBlogs();
  }
  
  getAllBlogs(){
    this.blogService.getBlogs().subscribe((res)=>{
      this.postdatalist = res.blogs;
    })
  }
  
  addpost(){
    this.blogService.addBlogs(this.postform.value).subscribe((res)=>{
      if(res){
        this.getAllBlogs();
        this.postform.reset();
        alert("post added successfully");
      }
    })
  }

  addLike(blogId : any){
    this.blogService.likedBlog(blogId).subscribe((res)=>{
      if(res){
        this.getAllBlogs();
      }
    })
  }
}
