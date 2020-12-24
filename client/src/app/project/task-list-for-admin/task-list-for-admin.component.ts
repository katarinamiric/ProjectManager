import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { take } from 'rxjs/operators';
import { AddTaskModalComponent } from 'src/app/modals/add-task-modal/add-task-modal.component';
import { TaskModalComponent } from 'src/app/modals/task-modal/task-modal.component';
import { Project } from 'src/app/_models/project';
import { Task } from 'src/app/_models/task';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { TaskService } from 'src/app/_services/task.service';

@Component({
  selector: 'app-task-list-for-admin',
  templateUrl: './task-list-for-admin.component.html',
  styleUrls: ['./task-list-for-admin.component.css']
})
export class TaskListForAdminComponent implements OnInit {
  tasks: Partial<Task[]>
  bsModalRef: BsModalRef;
  user: User;
  @Input() project: Project;


  constructor(private accountService: AccountService, private taskService: TaskService,
    private modalService: BsModalService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks() {
    this.taskService.getOverdueTasks(this.project.id).subscribe(tasks => {
      this.tasks = tasks;
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


}
