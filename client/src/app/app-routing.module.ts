import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { HomePageComponent } from './home/home-page/home-page.component';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ProjectPageComponent } from './project/project-page/project-page.component';
import { ProjectsComponent } from './project/projects/projects.component';
import { TaskListComponent } from './project/task-list/task-list.component';
import { AdminOnlyGuard } from './_guards/admin-only.guard';
import { AdminGuard } from './_guards/admin.guard';
import { AuthGuard } from './_guards/auth.guard';
import { PreventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';

const routes: Routes = [     
  { path: '', component: HomePageComponent },
  {
    path: '',
    runGuardsAndResolvers: "always",
    canActivate: [AuthGuard],  //all of the chilren below are covered by AuthGuard
    children: [
      { path: 'members', component: MemberListComponent, canActivate: [AdminOnlyGuard] },
      { path: 'members/:username', component: MemberDetailComponent },
      { path: 'member/edit', component: MemberEditComponent, canDeactivate: [PreventUnsavedChangesGuard] },
      { path: 'member/edit/:username', component: MemberEditComponent, canDeactivate: [PreventUnsavedChangesGuard] },
      { path: 'lists', component: ListsComponent },
      { path: 'projects', component: ProjectsComponent, canActivate: [AdminGuard] },
      { path: 'messages', component: MessagesComponent },
      { path: 'admin', component: AdminPanelComponent, canActivate: [AdminOnlyGuard] },
      { path: 'projects/:id', component: ProjectPageComponent, canActivate: [AdminGuard]  },
      { path: 'task', component: TaskListComponent },
    ]
  },
  {path: 'errors', component: TestErrorsComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: 'server-error', component: ServerErrorComponent},
  { path: '**', component: NotFoundComponent, pathMatch: 'full' }   

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
