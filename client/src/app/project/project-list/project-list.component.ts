import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EditProjectComponent } from 'src/app/modals/edit-project/edit-project.component';
import { RolesModalComponent } from 'src/app/modals/roles-modal/roles-modal.component';
import { Project } from 'src/app/_models/project';
import { ConfirmService } from 'src/app/_services/confirm.service';
import { MembersService } from 'src/app/_services/members.service';
import { ProjectService } from 'src/app/_services/project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  @Input() project: Project;
  bsModalRef: BsModalRef;
  @Input() updatePage = new EventEmitter();
  @Input() overallProgress: number;
  noOfTasksPerStatus: string;
  noOfTasksDeadline: number;



  constructor(private projectService: ProjectService, private modalService: BsModalService, 
      private confirmService: ConfirmService) { }

  ngOnInit(): void {

  }


  deleteProject(id: number) {

      this.confirmService.confirm('Confirmation', 'Are you sure you want to proceed?').subscribe(p => {
        if(p){
          this.projectService.deleteProject(id).subscribe(() => {
            this.updatePage.emit(true);
          })
          location.reload();
        }
      })
    
  }


  openEditModal(){
    const config = {
      class: 'modal-dialog-centered',
      initialState: {
        project: this.project

      }
    };
    this.bsModalRef = this.modalService.show(EditProjectComponent, config);
  }

  

}
