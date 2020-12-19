import { Component, EventEmitter, Input, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NgControl, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Member } from 'src/app/_models/member';
import { Project } from 'src/app/_models/project';
import { MembersService } from 'src/app/_services/members.service';
import { ProjectService } from 'src/app/_services/project.service';

@Component({
  selector: 'app-project-modal',
  templateUrl: './project-modal.component.html',
  styleUrls: ['./project-modal.component.css']
})
export class ProjectModalComponent implements OnInit {
  // project: Project;
  members: Member[];
  member: string = "nancy";
  @Input() updatePage = new EventEmitter();

  title: string;
  // list: any[] = [];
  // closeBtnName: string;
  registerForm: FormGroup;


  constructor(private projectService: ProjectService, private memberService: MembersService, public bsModalRef: BsModalRef, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadMembers();
  }

  initializeForm() {
    this.registerForm = this.fb.group({
      name: [''],
      member: [''],

    })
  }

  createProject() {
    //register(this.model) but we're not doing this anymore because now we're using reactive forms
    this.projectService.createProject(this.registerForm.value, this.member).subscribe(response => {
      console.log(this.member);
      console.log(this.member);
      console.log(this.member);
      console.log(this.member);
      console.log(this.member);
      console.log(this.member);


      this.bsModalRef.hide();
      this.updatePage.emit(true);
    }, error => {
      // this.validationErrors = error;
      console.log(error);
    });
  }

  loadMembers() {
    this.memberService.getMembers().subscribe(members => {
      this.members = members;
    })
  }

}
