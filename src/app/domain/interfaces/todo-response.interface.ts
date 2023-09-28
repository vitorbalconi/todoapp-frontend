import { TodoItemI } from "./todo.interface";

export interface ToDoResponseI {
  toDos: Array<TodoItemI>,
  firstPage: number,
  lastPage: number,
}
