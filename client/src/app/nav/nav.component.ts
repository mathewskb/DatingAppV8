import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, BsDropdownModule, RouterLink, RouterLinkActive, TitleCasePipe],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  model: any = {};
  accountService = inject(AccountService);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  login() {

    // console.log(this.model);
    this.accountService.login(this.model).subscribe({
      next: (resp) => {
        // console.log(resp);
        this.router.navigateByUrl('/members');
      },
      error: (er1) => {
        console.log(er1);
        this.toastr.error(er1.error);
      },
      complete: () => {
        console.log('Request Completed.');
      },
    });
  }

  logout(){
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
