import { Component, inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  model: any = {};
  accountService = inject(AccountService);

  register() {
    // console.log(this.model);
    this.accountService.register(this.model).subscribe({
      next: (res) => {
        console.log(res);
        this.cancel();
      },
      error: (er1) => {
        console.log(er1);
      },
      complete: () => {},
    })
  }

  cancel() {
    console.log('cancelled.');
  }
}
