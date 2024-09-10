import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AccountService } from '../_services/account.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {

  const accountService = inject(AccountService);
  if(accountService.currentUser()){
    // incoming request is immutable so we need to clone and then update the header to accomodate Authorization 
    req = req.clone({
      setHeaders : {
        Authorization : `Bearer ${accountService.currentUser()?.token}`
      }
    })
  }
  return next(req);
};
