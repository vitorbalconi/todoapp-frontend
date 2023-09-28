import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { urlConfig } from 'src/app/config/url.config';
import { TodoItemI } from '../interfaces/todo.interface';
import { Observable, map, tap, } from 'rxjs';
import { ToDoMapper } from '../mappers/todo-mapper';
import { ToDoReponseI } from '../interfaces/todo-response.interface';

@Injectable({
  providedIn: 'root'
})
export class TodoRepositoryService {


  constructor(private http: HttpClient) { }

  public getToDos(currentPage: number, limit: number, priority?: string, description?: string, ): Observable<ToDoReponseI> {
    let params = new HttpParams()
      .append('_page', currentPage)
      .append('_limit', limit)

    if (priority) {
      params = params.append('priority', priority)
    }
    if (description) {
      params = params.append('description', description)
    }

    if(currentPage) {
    }

    return this.http.get<Array<TodoItemI>>(urlConfig.urlTodo, { observe: 'response', params },).pipe(
      map(response => {

        return ToDoMapper.formatedTodo(response)
      })
    )
  }

  public addToDo(newToDo: Omit<TodoItemI, 'id'>): Observable<unknown> {
    return this.http.post(urlConfig.urlTodo, newToDo)
  }

  public doUndoTask(toDo: TodoItemI): Observable<unknown> {
    const { id } = toDo;
    const done = !toDo.done
    return this.http.patch(`${urlConfig.urlTodo}/${id}`, { done })
  }

  public deleteTask(toDo: TodoItemI): Observable<unknown> {
    const { id } = toDo;
    return this.http.delete(`${urlConfig.urlTodo}/${id}`)
  }
}
