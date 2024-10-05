import { CanActivateFn } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {

  const accountService = inject(AccountService);
  const toastr = inject(ToastrService);

  if (accountService.currentUser()) return true;
  else {
    toastr.error('You have not pass! we cant route to the specified route.');
    return false;
  }
};
