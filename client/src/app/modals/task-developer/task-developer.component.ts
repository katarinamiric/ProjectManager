import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Member } from 'src/app/_models/member';
import { Project } from 'src/app/_models/project';
import { Task } from 'src/app/_models/task';
import { MembersService } from 'src/app/_services/members.service';
import { TaskService } from 'src/app/_services/task.service';

@Component({
  selector: 'app-task-developer',
  templateUrl: './task-developer.component.html',
  styleUrls: ['./task-developer.component.css']
})
export class TaskDeveloperComponent implements OnInit {

  registerForm: FormGroup;
  project: Project;
  task: Task;
  members: Member[];
  member: string;
  datedate: Date;
  @Input() updatePage = new EventEmitter();


  constructor(public bsModalRef: BsModalRef, private fb: FormBuilder,
       private memberService: MembersService, private taskService: TaskService) {


  }

  ngOnInit(): void {
    this.initializeForm();
    this.loadMembers();
    this.member = this.task.user.username;
  }

  initializeForm() {
    this.registerForm = this.fb.group({
      status: [this.task.status],
      description: [this.task.description],
      project: [this.project],
      progress: [this.task.progress],
      user: [this.task.user]

    })
  }

  loadMembers() {
    this.memberService.getDevelopers().subscribe(members => {
      this.members = members;
    })
  }

  updateTask(task: Task) {
    this.taskService.updateTask(this.registerForm.value, task.id, this.member).subscribe(response => {
      this.bsModalRef.hide();
      this.updatePage.emit(true);
    }, error => {
      console.log(error);
    });
  }

}
