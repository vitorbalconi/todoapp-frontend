import { of } from "rxjs";
import { TodoRepositoryService } from "src/app/domain/data/todo-repository.service";
import { Priority } from "src/app/domain/enums/priority.enum";
import { ToDoResponseI } from "src/app/domain/interfaces/todo-response.interface";
import { TodoItemI } from "src/app/domain/interfaces/todo.interface";

export const toDosMock: Array<TodoItemI> = [
  {
    id: 1,
    description: 'test',
    dueDate: '2023-01-01',
    priority: Priority.HIGH,
    done: false,
  },
  {
    id: 2,
    description: 'test2',
    dueDate: '2023-01-01',
    priority: Priority.MEDIUM,
    done: true,
  }
];

export const toDoResponseMock: ToDoResponseI = {
  toDos: toDosMock,
  firstPage: 1,
  lastPage: 2,
}

export const toDoServiceMock =  jasmine.createSpyObj<TodoRepositoryService>('TodoRepositoryService',
  {
    'getToDos': of(toDoResponseMock),
    'addToDo': of({}),
    'doUndoTask': of({}),
    'deleteTask': of({})
  }
)
