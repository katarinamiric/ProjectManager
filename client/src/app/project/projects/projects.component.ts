import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { take } from 'rxjs/operators';
import { ProjectModalComponent } from 'src/app/modals/project-modal/project-modal.component';
import { RolesModalComponent } from 'src/app/modals/roles-modal/roles-modal.component';
import { Project } from 'src/app/_models/project';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
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
  user: User;
  overallProgress: number;

  constructor(private accountService: AccountService, private projectService: ProjectService, private modalService: BsModalService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.loadProjects();
  }


  loadProjects() {
    if (this.user.roles.includes("Admin")) {
      this.projectService.getProjects().subscribe(projects => {
        this.projects = projects;
        return;
      })
    }else{

    this.projectService.getProjectsForManagers(this.user.username).subscribe(projects => {
      this.projects = projects;
    })
  }
  }



  openRolesModal() {
    const config = {
     
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

