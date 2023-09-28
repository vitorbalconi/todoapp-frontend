import * as moment from "moment";
import { PriorityUtil } from "../enums/priority.enum";
import { TodoItemI } from "../interfaces/todo.interface";
import { ToDoResponseI } from "../interfaces/todo-response.interface";
import { HttpResponse } from "@angular/common/http";

export class ToDoMapper {
  static formatedTodo(response: HttpResponse<TodoItemI[]>): ToDoResponseI {
    const locale = navigator.language;

    if(!response.body) {
      return {
        firstPage: 1,
        lastPage: 1,
        toDos: []
      }
    }

    const pagesGuide = response.headers.get('Link')?.split(',')!;

    if(pagesGuide.length <= 1) {
      return {
        firstPage: 1,
        lastPage: 1,
        toDos: this.formatDateTodo(response.body)
      }
    }

    // Separetes the possible pages. We have just 3 possible pages that are 'firt' (index 0), 'next' (index 1) and 'last'(index 2).
    // Then use regex to get the string "page=number" and isole the page number

    const getPageNumber = (string: string) => {
      return string.match(/(page=\d)/g)![0].split('=')[1]

    }
    const firstPage = Number(getPageNumber(pagesGuide[0]));
    const lastPage = Number(getPageNumber(pagesGuide[2]));

    return {
        firstPage,
        lastPage,
        toDos: this.formatDateTodo(response.body)
    }

  };

  static formatDateTodo(toDos: Array<TodoItemI>): Array<TodoItemI> {
    return toDos.map(toDo => {
      return {
        ...toDo,
        priority: PriorityUtil.getValue(toDo.priority),
        dueDate: moment(toDo.dueDate, 'YYYY-MM-DD').format('DD/MM/YYYY')
      } as TodoItemI
    })
  }
}
