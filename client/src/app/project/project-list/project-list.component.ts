import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { RolesModalComponent } from 'src/app/modals/roles-modal/roles-modal.component';
import { Project } from 'src/app/_models/project';
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

  constructor(private projectService: ProjectService,private modalService: BsModalService) { }

  ngOnInit(): void {

  }

  

  

}
