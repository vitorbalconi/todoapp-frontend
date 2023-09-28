import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, combineLatest, concatMap, debounceTime, filter, forkJoin, merge, mergeAll, startWith, take, zip } from 'rxjs';
import { TodoRepositoryService } from 'src/app/domain/data/todo-repository.service';
import { Priority, PriorityUtil } from 'src/app/domain/enums/priority.enum';
import { TodoItemI } from 'src/app/domain/interfaces/todo.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {

  public date = new Date().toISOString().slice(0, 10)

  public todoForm = new FormGroup( {
    description: new FormControl('', Validators.required),
    dueDate: new FormControl(this.date, Validators.required),
    priority: new FormControl(PriorityUtil.getKey(Priority.LOW), Validators.required),
    done: new FormControl(false, Validators.required)
  })

  public toDoList: Array<TodoItemI> = [];

  public priorities = PriorityUtil.getIterableArray();

  public priorityControl = new FormControl('');

  public searchControl = new FormControl('');

  public itensPerPageOptions = [5,10,20];

  public itensPerPage = new FormControl(this.itensPerPageOptions[0]);

  public currentPage = 1;

  public lastPage = 1;

  public firstPage = 1;

  public timeToWaitUserInputs = 500;


  constructor(private toDoService: TodoRepositoryService) {
    this.searchToDos();
  }

  public get disableNextPage(): boolean {
    return this.currentPage >= this.lastPage;
  }

  public get disablePreviousPage(): boolean {
    return this.currentPage <= this.firstPage;
  }

  public searchToDos(): void {


    combineLatest([
      this.priorityControl.valueChanges.pipe(startWith('')),
      this.searchControl.valueChanges.pipe(startWith('')),
      this.itensPerPage.valueChanges.pipe(startWith(this.itensPerPageOptions[0]))
    ])
    .pipe(
      debounceTime(this.timeToWaitUserInputs),
      takeUntilDestroyed()
    )
    .subscribe(() => {
      this.getToDos();
    })
  }

  public getToDos(): void {
    const priority = this.priorityControl.value!;
    const search = this.searchControl.value!;
    const itensPerPage = this.itensPerPage.value!;

    this.toDoService.getToDos(this.currentPage, itensPerPage, priority, search)
    .pipe(take(1))
    .subscribe(data => {
      this.firstPage = data.firstPage;
      this.lastPage = data.lastPage;
      this.toDoList = data.toDos;
    })
  }

  public addTodo(): void {
    const newToDo = this.todoForm.value;

    const newTodoNonNullish: Omit<TodoItemI, 'id'> = {
      description: newToDo.description!,
      done: false,
      dueDate: newToDo.dueDate!,
      priority: newToDo.priority!
    }

    this.toDoService.addToDo(newTodoNonNullish)
    .pipe(take(1))
    .subscribe(() => {
      window.alert('Task created!');
      this.todoForm.controls.description.setValue('');
      this.getToDos()
    })
  }

  public removeTodo(toDo: TodoItemI): void {

    this.toDoService.deleteTask(toDo)
    .pipe(take(1))
    .subscribe(() => {
      window.alert('Task deleted!');

      this.getToDos();
    })
  }

  public doUndoTask(todo: TodoItemI): void {
    this.toDoService.doUndoTask(todo)
    .pipe(take(1))
    .subscribe(() => {
      this.getToDos();
    })
  }

  public nextPage(): void {
    this.currentPage += 1;

    this.getToDos();
  }

  public previousPage(): void {
    this.currentPage -= 1;

    this.getToDos();
  }
}
