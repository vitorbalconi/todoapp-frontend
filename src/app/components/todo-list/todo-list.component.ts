import { Component, inject } from '@angular/core';
import { TodoItemI } from 'src/app/interfaces/todo-item';
import { TodoListI } from 'src/app/interfaces/todo-list';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {


  public todoForm = new FormGroup( {
    todo: new FormControl('')
  })

  public todoList: TodoListI = [];

  public addTodo(): void {
    const newTodo = this.todoForm.value.todo

    if(!newTodo) return

    this.todoList.push({
      id: 1,
      todo: newTodo,
      done: false,
    })

    this.todoForm.reset()
  }

  public removeTodo(todo: TodoItemI): void {
    const indexTodo = this.todoList.indexOf(todo);
    this.todoList.splice(indexTodo,1 );
  }

  public markAsDone(todo: TodoItemI): void {
    todo.done = true;
  }

  public undoTask(todo: TodoItemI): void {
    todo.done = false;
  }
}
