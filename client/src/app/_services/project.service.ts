import { HttpClient } from '@angular/common/http';
import { CoreEnvironment } from '@angular/compiler/src/compiler_facade_interface';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Project } from '../_models/project';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }


  getProjects() {
    return this.http.get<Project[]>(this.baseUrl + 'project');
  }

  // getProject(username: string) {
  //   return this.http.get<Member>(this.baseUrl + 'project/createMember' + username);
  // }

  createProject(model: any, username: string){
    return this.http.post(this.baseUrl + 'project/' + username, model).pipe(
      map((project: Project) => {
        // if(register){
        //   this.setCurrentUser(user);
        // }
      })
    )
  }
}
