import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Project } from 'src/app/_models/project';
import { ProjectService } from 'src/app/_services/project.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {
  project: Project;
  registerForm: FormGroup;

  constructor(public bsModalRef: BsModalRef, private fb: FormBuilder, private projectService: ProjectService) { }

  ngOnInit(): void {
    this.initializeForm();
  }



  initializeForm() {
    this.registerForm = this.fb.group({
      name: [this.project.name],
      // member: [''],

    })
  }

  updateProject(){
    this.projectService.updateProject(this.registerForm.value, this.project.id).subscribe(() =>{
      location.reload();
    })
  }

}
