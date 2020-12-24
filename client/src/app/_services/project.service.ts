import { HttpClient } from '@angular/common/http';
import { CoreEnvironment } from '@angular/compiler/src/compiler_facade_interface';
import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Progress } from '../_models/progress';
import { Project } from '../_models/project';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  baseUrl = environment.apiUrl;
  progress: Progress;

  constructor(private http: HttpClient) { }


  getProjects() {
    return this.http.get<Project[]>(this.baseUrl + 'project');
  }

  getProject(id: number) {
    return this.http.get<Project>(this.baseUrl + 'project/get-project/' + id);
  }

  getProjectsForManagers(username: string) {
    return this.http.get<Project[]>(this.baseUrl + 'project/' + username);
  }




  createProject(model: any, username: string){
    return this.http.post(this.baseUrl + 'project/' + username, model).pipe(
      map((project: Project) => {

      })
    )
  }ro
  deleteProject(id: number){
    return this.http.delete(this.baseUrl + 'project/' + id);
  }

  getProgress(id: number){

    return this.http.get<number>(this.baseUrl + 'project/overall-progress/' + id);
    
  }

  getNoOfTasksPerStatus(id: number){
    return this.http.get<Progress>(this.baseUrl + 'project/per-status/' + id);
  }

  updateProject(project: Project, id: number){
    return this.http.put(this.baseUrl + 'project/' + id, project);
  }

}
