import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, BsDropdownModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  model: any = {};
  accountService = inject(AccountService);

  login() {

    // console.log(this.model);

    this.accountService.login(this.model).subscribe({
      next: (resp) => {
        console.log(resp);
      },
      error: (er1) => {
        console.log(er1);
      },
      complete: () => {
        console.log('Request Completed.');
      },
    });
  }

  logout(){
    this.accountService.logout();
  }
}
