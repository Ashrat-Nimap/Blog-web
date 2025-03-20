import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable,map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogServiceService {
  private url = "http://localhost:5000";

  constructor(private http : HttpClient,private router : Router) { }

  userRegister(data:Partial<{
    username:any,
    password:any
  }>) : Observable<any>{
    return this.http.post(`${this.url}/api/auth/register`,data);
  }
  userLogin(data:Partial<{
    username:any,
    password:any
  }>) : Observable<any>{
    return this.http.post(`${this.url}/api/auth/login`,data);
  }

  addBlogs(blogdata : any) : Observable<any>{
    return this.http.post(`${this.url}/api/blogs`,blogdata);
  }

  getBlogs() : Observable<any>{
    return this.http.get(`${this.url}/api/blogs`);
  }

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }

  likedBlog(blogId : any){
    return this.http.post(`${this.url}/api/blogs/${blogId}/like`,{});
  }
  
}

