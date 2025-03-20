import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { BlogServiceService } from './blog-service.service';

export const authinterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const blogService = inject(BlogServiceService);
  const token = blogService.getToken();

  // if(req.url === 'http://localhost:3000/users' && !req.params.has('login')){
  //   return next(req);
  // }

  if(token){
    req = req.clone({
      setHeaders : {
        Authorization : `Bearer ${token}`
      }
    })
    console.log(token)
  }
  return next(req);
};
