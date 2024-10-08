import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Member } from '../../_models/member';
import { of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  
  private http = inject(HttpClient);
  // private accountService = inject(AccountService);
  baseUrl = environment.apiUrl;
  members = signal<Member[]>([]);


  getMembers() {
    // return this.http.get<Member[]>(this.baseUrl + 'users', this.getHttpOptions());
    // return this.http.get<Member[]>(this.baseUrl + 'users');

    // usage of managing the state (caching)
    return this.http.get<Member[]>(this.baseUrl + 'users').subscribe({
      next : mems => this.members.set(mems)
    })

  }

  getMember(username: string) {
    // return this.http.get<Member>(this.baseUrl + 'users/' + username, this.getHttpOptions());
    // caching
    const member = this.members().find(x => x.username === username);
    if(member !== undefined) return of(member);

    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }

  // no need of /slash after users as we are expecing the form value in member
  updateMember(member : Member) {
    // return this.http.put(this.baseUrl + 'users', member);
    // caching 

    return this.http.put(this.baseUrl + 'users', member).pipe(
      tap(() => {
        this.members.update(members => members.map(m => m.username === member.username 
          ? member : m))
      })
    )
  }

  // getHttpOptions() {
  //   return {
  //     headers: new HttpHeaders({
  //       Authorization: `Bearer ${this.accountService.currentUser()?.token}`
  //     })
  //   }
  //}
}
