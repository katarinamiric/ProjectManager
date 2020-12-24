import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/_models/member';
import { Project } from 'src/app/_models/project';
import { Task } from 'src/app/_models/task';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';
import { TaskService } from 'src/app/_services/task.service';

@Component({
  selector: 'app-add-task-modal',
  templateUrl: './add-task-modal.component.html',
  styleUrls: ['./add-task-modal.component.css']
})
export class AddTaskModalComponent implements OnInit {

  registerForm: FormGroup;
  project: Project;
  task: Task;
  members: Member[];
  user: User;
  member: string = "";
  @Input() updatePage = new EventEmitter();


  constructor(private accountService: AccountService, public bsModalRef: BsModalRef, private fb: FormBuilder,
    private memberService: MembersService, private taskService: TaskService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      this.user = user,
      this.member = user.username
    });
  }

  ngOnInit(): void {
    this.initializeForm();
    this.loadMembers();
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);

  }

  initializeForm() {
    this.registerForm = this.fb.group({
      status: [''],
      description: [''],
      project: [this.project],
      progress: [],
      deadline: []


    })
  }

  loadMembers() {
    this.memberService.getDevelopers().subscribe(members => {
      this.members = members;
    })
  }

  createTask() {
    this.taskService.createTask(this.registerForm.value, this.member, this.project.id).subscribe(response => {
      this.bsModalRef.hide();
      this.updatePage.emit(true);
    }, error => {
      console.log(error);
    });
  }

}
