import { Component, EventEmitter, Input, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NgControl, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/_models/member';
import { Project } from 'src/app/_models/project';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';
import { ProjectService } from 'src/app/_services/project.service';

@Component({
  selector: 'app-project-modal',
  templateUrl: './project-modal.component.html',
  styleUrls: ['./project-modal.component.css']
})
export class ProjectModalComponent implements OnInit {

  members: Member[];
  user: User;
  member: string = "nancy";
  @Input() updatePage = new EventEmitter();

  title: string;

  registerForm: FormGroup;


  constructor(private projectService: ProjectService, private memberService: MembersService,
    public bsModalRef: BsModalRef, private fb: FormBuilder, private accountService: AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);

  }

  ngOnInit(): void {
    this.initializeForm();
    this.loadMembers();
    this.member = this.user.username;
  }

  initializeForm() {
    this.registerForm = this.fb.group({
      name: [''],
      member: [this.user.username],

    })
  }

  createProject() {

    this.projectService.createProject(this.registerForm.value, this.member).subscribe(response => {
      this.bsModalRef.hide();
      this.updatePage.emit(true);
    }, error => {

      console.log(error);
    });
  }

  loadMembers() {
    this.memberService.getManagers().subscribe(members => {
      this.members = members;
    })
  }

}
