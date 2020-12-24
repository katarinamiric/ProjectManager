import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  @Input() member: Member;
  @Input() updatePage = new EventEmitter();

  constructor(private accountServuce: AccountService) { }

  ngOnInit(): void {
  }

  deleteUser(id: number) {
    this.accountServuce.deleteUser(id).subscribe(() => { 
      this.updatePage.emit(true);

    });
    location.reload();
  }

}
