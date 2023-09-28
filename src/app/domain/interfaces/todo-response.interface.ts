import { TodoItemI } from "./todo.interface";

export interface ToDoReponseI {
  toDos: Array<TodoItemI>,
  firstPage: number,
  lastPage: number,
}
