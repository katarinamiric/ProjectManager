import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(public accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    // this.currentUser$ = this.accountService.currentUser$;

  }

  login() {
    //login is returning an observable which doesnt do anything until we subscribe
    //response is the response of the server that we will receive
    this.accountService.login(this.model).subscribe(response => {
      this.router.navigateByUrl('/members');

    });
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');

  }

  // getCurrentUser() {
  //   this.accountService.currentUser$.subscribe(user => {
  //     this.loggedIn = !!user;    //turn object into boolean, if user is null then false, otherwise true
  //   }, error => {
  //     console.log(error);
  //   })
  // }

}
