import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';

import { HttpClientTestingModule } from '@angular/common/http/testing'
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TodoRepositoryService } from 'src/app/domain/data/todo-repository.service';
import { of } from 'rxjs';
import { toDoServiceMock, toDosMock } from 'src/__mocks__/todo.mock';
import { TodoItemI } from 'src/app/domain/interfaces/todo.interface';

fdescribe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  let toDoService: jasmine.SpyObj<TodoRepositoryService>;



  beforeEach(() => {
    toDoService = toDoServiceMock;

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [TodoListComponent],
      providers: [
        {
          provide: TodoRepositoryService,
          useValue: toDoServiceMock
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('calls getToDos when construct component', fakeAsync(() => {
    toDoService.getToDos.calls.reset();

    component = TestBed.createComponent(TodoListComponent).componentInstance;
    const { currentPage, itensPerPage, priorityControl, searchControl } = component;
    tick(component.timeToWaitUserInputs);
    expect(toDoService.getToDos).toHaveBeenCalledWith(currentPage, itensPerPage.value!, priorityControl.value!, searchControl.value!);
  }))

  it('add a task', () => {
    const [ toDoMock ] = toDosMock;
    const { description, dueDate, done, priority } = toDoMock;

    const newTodoNonNullish: Omit<TodoItemI, 'id'> = {
      description: toDoMock.description,
      done: toDoMock.done,
      dueDate: toDoMock.dueDate,
      priority: toDoMock.priority!
    };

    component.todoForm.setValue({
      description,
      dueDate,
      done,
      priority
    });

    component.addTodo();

    expect(toDoService.addToDo).toHaveBeenCalledWith(newTodoNonNullish);
  });

  it('remove ToDo', () => {
    const [ toDoMock ] = toDosMock;

    toDoService.getToDos.calls.reset();

    component.removeTodo(toDoMock);

    expect(toDoService.deleteTask).toHaveBeenCalledWith(toDoMock);
    expect(toDoService.getToDos.calls.count()).toBeGreaterThanOrEqual(1);
  });


  it('mark task as done or undo', () => {
    const [ toDoMock ] = toDosMock;

    toDoService.getToDos.calls.reset();

    component.doUndoTask(toDoMock)

    expect(toDoService.doUndoTask).toHaveBeenCalledWith(toDoMock)
    expect(toDoService.getToDos.calls.count()).toBeGreaterThanOrEqual(1);
  });

  it('calls next page from pagination of get ToDos', () => {
    toDoService.getToDos.calls.reset();

    component.nextPage();

    expect(component.currentPage).toEqual(2)
  });

  it('calls previous page from pagination of get ToDos', () => {
    component.currentPage = 2;
    toDoService.getToDos.calls.reset();

    component.previousPage();

    expect(component.currentPage).toEqual(1);
  });
});
