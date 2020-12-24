import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';


@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;



  constructor(private http: HttpClient) { }

  getMembers() {
    return this.http.get<Member[]>(this.baseUrl + 'users');
  }

  getManagers() {
    return this.http.get<Member[]>(this.baseUrl + 'users/managers');
  }

  getDevelopers() {
    return this.http.get<Member[]>(this.baseUrl + 'users/developers');
  }

  getMember(username: string) {
    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }

  updateMember(member: Member, username: string) {
    return this.http.put(this.baseUrl + 'users' + "?username=" + username, member);
  }

}
