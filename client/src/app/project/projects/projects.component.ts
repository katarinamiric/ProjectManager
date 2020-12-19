import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ProjectModalComponent } from 'src/app/modals/project-modal/project-modal.component';
import { RolesModalComponent } from 'src/app/modals/roles-modal/roles-modal.component';
import { Project } from 'src/app/_models/project';
import { ProjectService } from 'src/app/_services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: Project[];
  bsModalRef: BsModalRef;
  project: Project;

  constructor(private projectService: ProjectService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.loadProjects();
  }


  loadProjects() {
    this.projectService.getProjects().subscribe(projects => {
      this.projects = projects;
    })
  }

  // openRolesModal() {
  //   // this.bsModalRef = this.modalService.show(RolesModalComponent);
  //   const config = {
  //     class: 'modal-dialog-centered',
  //     // initialState: {
  //     //   user,
  //     //   roles: this.getRolesArray(user)
  //     // }
  //   }
  //   this.bsModalRef = this.modalService.show(RolesModalComponent, config);
  //   // this.bsModalRef.content.updateSelectedRoles.subscribe(values =>{
  //   //   const rolesToUpdate = {
  //   //     roles: [...values.filter(el => el.checked === true).map(el => el.name)]
  //   //   };
  //     // if(rolesToUpdate){
  //     //   this.projectService.createProject(this.project).subscribe(() =>{
  //     //     // user.roles = [...rolesToUpdate.roles]
  //     //   })
  //     // }
  //   // })
  // }

  openRolesModal() {
    const config = {
      // list: [
      //   'Open a modal with component',
      //   'Pass your data',
      //   'Do something else',
      //   '...'
      // ],
      // title: 'Modal with component'
    };
    this.bsModalRef = this.modalService.show(ProjectModalComponent, config);
    this.bsModalRef.content.updatePage.subscribe(value => {
      const v = value;
      if (v) {
        location.reload();
      }
    })
    this.bsModalRef.content.closeBtnName = 'Close';
  }
}

