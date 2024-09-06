import { Component, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

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
  cancelRegister = output<boolean>();
  private toastr = inject(ToastrService);

  register() {
    // console.log(this.model);
    this.accountService.register(this.model).subscribe({
      next: (res) => {
        console.log(res);
        this.cancel();
      },
      error: (er1) => {
        console.log(er1);
        this.toastr.error(er1.error);
      },
      complete: () => { },
    })
  }

  cancel() {
    console.log('cancelled.');
    this.cancelRegister.emit(false);
  }
}
