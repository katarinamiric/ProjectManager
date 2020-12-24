import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { take } from 'rxjs/operators';
import { AddTaskModalComponent } from 'src/app/modals/add-task-modal/add-task-modal.component';
import { ConfirmModalComponent } from 'src/app/modals/confirm-modal/confirm-modal.component';
import { TaskDeveloperComponent } from 'src/app/modals/task-developer/task-developer.component';
import { TaskModalComponent } from 'src/app/modals/task-modal/task-modal.component';
import { Project } from 'src/app/_models/project';
import { Task } from 'src/app/_models/task';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { ConfirmService } from 'src/app/_services/confirm.service';
import { ProjectService } from 'src/app/_services/project.service';
import { TaskService } from 'src/app/_services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Partial<Task[]>
  bsModalRef: BsModalRef;
  user: User;
  page: boolean;
  result: number;
  @Output() progress = new EventEmitter();
  @Input() project: Project;


  constructor(private accountService: AccountService, private taskService: TaskService,
    private modalService: BsModalService, private confirmService: ConfirmService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.getTasks();
    this.calculateProgress();
  }

  getTasks() {
    if (this.user.roles.includes("Admin") || this.user.roles.includes("Manager")) {
      if (this.project == null) {
        this.taskService.getTasksForDeveloper(this.user.username).subscribe(tasks => {
          this.tasks = tasks;
          this.page = false;
        })
        return;
      }
      this.taskService.getTasksForManagerAndAdmin(this.user.username, this.project.id).subscribe(tasks => {
        this.tasks = tasks;
        this.page = true;
      })
      return;
    }


    this.taskService.getTasksForDeveloper(this.user.username).subscribe(tasks => {
      this.tasks = tasks;
      this.page = false;
    })
  }

  openRolesModal(task: Task) {
    const config = {
      class: 'modal-dialog-centered',
      initialState: {
        project: this.project,
        task

      }
    };
    this.bsModalRef = this.modalService.show(TaskModalComponent, config);
    this.bsModalRef.content.updatePage.subscribe(value => {
      const v = value;
      if (v) {
        location.reload();
      }
    })
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  openRolesModal2(task: Task) {
    const config = {
      class: 'modal-dialog-centered',
      initialState: {
        project: this.project,
        task

      }
    };
    this.bsModalRef = this.modalService.show(TaskDeveloperComponent, config);
    this.bsModalRef.content.updatePage.subscribe(value => {
      const v = value;
      if (v) {
        location.reload();
      }
    })
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  openRolesModalAdd() {
    const config = {
      class: 'modal-dialog-centered',
      initialState: {
        project: this.project

      }
    };
    this.bsModalRef = this.modalService.show(AddTaskModalComponent, config);
    this.bsModalRef.content.updatePage.subscribe(value => {
      const v = value;
      if (v) {
        location.reload();
      }
    })
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  deleteTask(id: number) {

      this.confirmService.confirm().subscribe(p => {
        if(p){
          this.taskService.deleteTask(id).subscribe(() => {

          });
          location.reload();
        }
      })


  }


  calculateProgress() {



  }
}
