import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',    //this selector is used to add a component
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {}
  // loggedIn: boolean = false;   we won't be using this anymore
  // currentUser$: Observable<User>;

  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
    // this.currentUser$ = this.accountService.currentUser$;

  }

  login() {
    //login is returning an observable which doesnt do anything until we subscribe
    //response is the response of the server that we will receive
    this.accountService.login(this.model).subscribe(response => {
      console.log(response);

    }, error => {
      console.log(error);
    });
  }

  logout() {
    this.accountService.logout();

  }

  // getCurrentUser() {
  //   this.accountService.currentUser$.subscribe(user => {
  //     this.loggedIn = !!user;    //turn object into boolean, if user is null then false, otherwise true
  //   }, error => {
  //     console.log(error);
  //   })
  // }

}
