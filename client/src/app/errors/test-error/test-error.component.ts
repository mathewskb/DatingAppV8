import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-test-error',
  standalone: true,
  imports: [],
  templateUrl: './test-error.component.html',
  styleUrl: './test-error.component.css'
})
export class TestErrorComponent {

  baseUrl = 'https://localhost:5001/api/';
  private http = inject(HttpClient);
  validationErrors: string[] = [];

  get400Error() {
    this.http.get(this.baseUrl + 'buggy/bad-request').subscribe({
      next: resp => console.log(resp),
      error: err => {
        console.log(err);
      }
    })
  }

  get401Error() {
    this.http.get(this.baseUrl + 'buggy/auth').subscribe({
      next: resp => console.log(resp),
      error: err => {
        console.log(err);
        this.validationErrors = err;
      }
    })
  }

  get404Error() {
    this.http.get(this.baseUrl + 'buggy/not-found').subscribe({
      next: resp => console.log(resp),
      error: err => {
        console.log(err);
      }
    })
  }
  get500Error() {
    this.http.get(this.baseUrl + 'buggy/server-error').subscribe({
      next: resp => console.log(resp),
      error: err => {
        console.log(err);
      }
    })
  }


  get400ValidationError() {
    this.http.post(this.baseUrl + 'account/register', {}).subscribe({
      next: resp => console.log(resp),
      error: err => {
        this.validationErrors = err;
        console.log(err);
      }
    })
  }
}
