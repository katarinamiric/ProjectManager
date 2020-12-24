import { Component, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TaskModalComponent } from 'src/app/modals/task-modal/task-modal.component';
import { Progress } from 'src/app/_models/progress';
import { Project } from 'src/app/_models/project';
import { ProjectService } from 'src/app/_services/project.service';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css']
})
export class ProjectPageComponent implements OnInit {
  project: Project;
  bsModalRef: BsModalRef;
  private modalService: BsModalService;
  progress: number;
  noOfTasks: Progress;

  

  constructor(private projectService: ProjectService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadProject();
    this.progress;
    this.getProgress();
    this.getNoOfTasksPerStatus();
  }

  loadProject(){       
    this.projectService.getProject(Number(this.route.snapshot.paramMap.get('id'))).subscribe(project => {
      this.project = project;
    })
  }

  openRolesModal() {
    const config = {
      class: 'modal-dialog-centered',
      initialState: {
        project: this.project
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

  getProgress(){
    this.projectService.getProgress(Number(this.route.snapshot.paramMap.get('id'))).subscribe(progress =>{
      this.progress = progress;


    });

  }

  getNoOfTasksPerStatus(){
    this.projectService.getNoOfTasksPerStatus(Number(this.route.snapshot.paramMap.get('id'))).subscribe(tasks =>{
      this.noOfTasks = tasks;


    });
  }

}
