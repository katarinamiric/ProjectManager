import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';


@Injectable({         //service can be injected into other components or services
  //angular service is a singleton
  providedIn: 'root'
})
export class AccountService {  //here we're going to make a request to the API

  baseUrl = environment.apiUrl;   //this is not hardcoded anymore
  private currentUserSource = new ReplaySubject<User>(1);  //1 is the size of buffer
  currentUser$ = this.currentUserSource.asObservable(); //$ sign is a convention for observable

  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post(this.baseUrl + 'account/login', model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          this.setCurrentUser(user);
        }
      })
    )
  }

  register(model: any){
    return this.http.post(this.baseUrl + 'account/register', model).pipe(
      map((user: User) => {
        if(user){
          this.setCurrentUser(user);
        }
      })
    )
  }

  setCurrentUser(user: User) {
    user.roles = [];
    const roles = this.getDecodedToken(user.token).role;
    // the roles of an user can be an array if there are multiple roles or just an atribute if there is one role, so that is why we are checking if it is an array
    Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);

  }

  getDecodedToken(token){
    //atob allows us to decode the information inside a token
    return JSON.parse(atob(token.split('.')[1]));
  }

}
