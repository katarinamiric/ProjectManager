import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Task } from '../_models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }


  getTasks() {
    return this.http.get<Task[]>(this.baseUrl + 'task');
  }

  getTasksForDeveloper(username: string){
    return this.http.get<Task[]>(this.baseUrl + 'task/' + username);
  }

  getTasksForManagerAndAdmin(username: string, id: number){
    return this.http.get<Task[]>(this.baseUrl + 'task/all-tasks/' + username + "/" + id);
  }

  getTasksForSpecifiedProject(username: string, id: number){
    return this.http.get<Task[]>(this.baseUrl + 'task/specific-tasks/' + username + "/" + id);
  }

  getOverdueTasks(id: number){
    return this.http.get<Task[]>(this.baseUrl + 'project/overdue-tasks/' + id);
  }

  createTask(model: any, username: string, id: number){
    return this.http.post(this.baseUrl + 'task/' + username + "/" + id, model).pipe(
      map((task: Task) => {

      })
    )
  }

  updateTask(task: Task, id: number, username: string) {
    return this.http.put(this.baseUrl + 'task/' + id + "?username=" + username, task);
  }

  deleteTask(id: number){
    return this.http.delete(this.baseUrl + 'task/' + id);
  }

  
}
