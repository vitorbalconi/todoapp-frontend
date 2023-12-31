import { of } from "rxjs";
import { TodoRepositoryService } from "src/app/domain/data/todo-repository.service";
import { Priority, PriorityUtil } from "src/app/domain/enums/priority.enum";
import { ToDoResponseI } from "src/app/domain/interfaces/todo-response.interface";
import { TodoItemI } from "src/app/domain/interfaces/todo.interface";

export const toDosMock: Array<TodoItemI> = [
  {
    id: 1,
    description: 'test',
    dueDate: '2023-01-01',
    priority: PriorityUtil.getKey(Priority.HIGH)!,
    done: false,
  },
  {
    id: 2,
    description: 'test2',
    dueDate: '2023-01-01',
    priority: PriorityUtil.getKey(Priority.HIGH)!,
    done: true,
  }
];

export const toDoResponseMock: ToDoResponseI = {
  toDos: toDosMock,
  firstPage: 1,
  lastPage: 2,
}

export const toDosFormatedDateMock: Array<TodoItemI> = [
  {
    id: 1,
    description: 'test',
    dueDate: '01/01/2023',
    priority: Priority.HIGH,
    done: false,
  },
  {
    id: 2,
    description: 'test2',
    dueDate: '01/01/2023',
    priority: Priority.HIGH,
    done: true,
  }
];

export const toDosReponseFormatedDateMock: ToDoResponseI = {
  toDos: toDosFormatedDateMock,
  firstPage: 1,
  lastPage: 2,
}

export const newToDoMock: Omit<TodoItemI, 'id'> = {
  description: 'test',
  done: false,
  dueDate: '2023-01-01',
  priority: PriorityUtil.getKey(Priority.HIGH)!,
}

export const toDoServiceMock =  jasmine.createSpyObj<TodoRepositoryService>('TodoRepositoryService',
  {
    'getToDos': of(toDoResponseMock),
    'addToDo': of({}),
    'doUndoTask': of({}),
    'deleteTask': of({})
  }
)
