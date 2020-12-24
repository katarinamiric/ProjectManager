import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from './_modules/shared.module';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { TextInputComponent } from './_forms/text-input/text-input.component';
import { DateInputComponent } from './_forms/date-input/date-input.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { HasRoleDirective } from './_directives/has-role.directive';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { PhotoManagementComponent } from './admin/photo-management/photo-management.component';
import { RolesModalComponent } from './modals/roles-modal/roles-modal.component';
import { ProjectsComponent } from './project/projects/projects.component';
import { ProjectListComponent } from './project/project-list/project-list.component';
import { ProjectModalComponent } from './modals/project-modal/project-modal.component';
import { ProjectPageComponent } from './project/project-page/project-page.component';
import { TaskListComponent } from './project/task-list/task-list.component';
import { TaskModalComponent } from './modals/task-modal/task-modal.component';
import { AreaFieldInputComponent } from './_forms/area-field-input/area-field-input.component';
import { TaskListForAdminComponent } from './project/task-list-for-admin/task-list-for-admin.component';
import { AddTaskModalComponent } from './modals/add-task-modal/add-task-modal.component';
import { ConfirmModalComponent } from './modals/confirm-modal/confirm-modal.component';
import { EditProjectComponent } from './modals/edit-project/edit-project.component';
import { LoginComponent } from './home/login/login.component';
import { HomePageComponent } from './home/home-page/home-page.component';
import { TaskDeveloperComponent } from './modals/task-developer/task-developer.component';




// import { NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    MemberDetailComponent,
    ListsComponent,
    MessagesComponent,
    TestErrorsComponent,
    NotFoundComponent,
    ServerErrorComponent,
    MemberCardComponent,
    MemberEditComponent,
    TextInputComponent,
    DateInputComponent,
    AdminPanelComponent,
    HasRoleDirective,
    UserManagementComponent,
    PhotoManagementComponent,
    RolesModalComponent,
    ProjectsComponent,
    ProjectListComponent,
    ProjectModalComponent,
    ProjectPageComponent,
    TaskListComponent,
    TaskModalComponent,
    AreaFieldInputComponent,
    TaskListForAdminComponent,
    AddTaskModalComponent,
    ConfirmModalComponent,
    EditProjectComponent,
    LoginComponent,
    HomePageComponent,
    TaskDeveloperComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,

    // NgxSpinnerModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },     //this is our INTERCEPTOR
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }

  ],                      //multi:true means we want to add outs to the existing interceptors and not replace them!! 
  //basically angular already has it's own interceptors but we're adding our own like this
  bootstrap: [AppComponent]
})
export class AppModule { }
