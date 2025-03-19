import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable,map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogServiceService {
  private url = "http://localhost:3000/users";
  private postsurl = "http://localhost:3000/posts";

  constructor(private http : HttpClient,private router : Router) { }
  userId! : number;
  userregister(userdata : any) : Observable<any>{
    return this.http.post(this.url,userdata);
  }

  getUser(email:string,password:string) : Observable<any>{
    return this.http.get<any[]>(this.url).pipe(map(users => {
      const user = users.find((u : any) => u.email === email && u.password === password);
      if(user){
        localStorage.setItem('username',user.Username);
        this.userId = user.id
        this.router.navigate(['/blog', this.userId]);
        return true;
      }else{
        return false;
      }
    }))
  }

  getAllUser():Observable<any>{
    return this.http.get<any[]>(this.url).pipe(map(users =>{
      this.http.get<any[]>(this.postsurl).subscribe(posts =>{
        users.forEach(user =>{
          user.post = posts.filter(post => post.userId === user.id);
        });
      })
      return users
    })
  );
  }

  addPost(userId: any,postdata : any) : Observable<any>{
    const postWithUser = { ...postdata, userId };
    return this.http.post(this.postsurl, postWithUser);
  }
}

