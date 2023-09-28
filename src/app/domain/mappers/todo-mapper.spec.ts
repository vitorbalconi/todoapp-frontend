import { HttpHeaders, HttpResponse } from "@angular/common/http";
import { toDoResponseMock, toDosFormatedDateMock, toDosMock, toDosReponseFormatedDateMock } from "src/__mocks__/todo.mock";
import { ToDoMapper } from "./todo-mapper";
import { ToDoResponseI } from "../interfaces/todo-response.interface";
import { TodoItemI } from "../interfaces/todo.interface";

describe('ToDoMapper', () => {
  const limit = 1;
  const mockLinkHeader = `<http://localhost:3000/todos?_page=${toDoResponseMock.firstPage}&_limit=${limit}>; rel="first", <http://localhost:3000/todos?_page=${toDoResponseMock.lastPage}&_limit=${limit}>; rel="next", <http://localhost:3000/todos?_page=${toDoResponseMock.lastPage}&_limit=${limit}>; rel="last"`;

  let todoMapper: ToDoMapper;

  beforeEach(() => {
    todoMapper = new ToDoMapper()
  })


  it('format ToDo to have ToDoResponseI, and format dates and priority', () => {
    const body = toDosMock
    const headers = new HttpHeaders().set('Link', mockLinkHeader)
    const httpResponse = new HttpResponse({
      headers,
      body
    });

    const expectedTodoResponse = ToDoMapper.formatedTodo(httpResponse);

    expect(expectedTodoResponse).toEqual(toDosReponseFormatedDateMock)
  })

  it('return empty toDo list when doesnt have body', () => {
    const headers = new HttpHeaders().set('Link', mockLinkHeader)
    const httpResponse = new HttpResponse<TodoItemI[]>({
      headers,
    });

    const formatedToDos:ToDoResponseI = {
      firstPage: 1,
      lastPage: 1,
      toDos: []
    }

    const expectedTodoResponse = ToDoMapper.formatedTodo(httpResponse);

    expect(expectedTodoResponse).toEqual(formatedToDos)
  })

  it('return reseted pagination when doesnt have pagination', () => {
    const headers = new HttpHeaders().set('Link', '');
    const body = toDosMock;

    const httpResponse = new HttpResponse<TodoItemI[]>({
      headers,
      body
    });

    const formatedToDos:ToDoResponseI = {
      firstPage: 1,
      lastPage: 1,
      toDos: toDosFormatedDateMock
    }

    const expectedTodoResponse = ToDoMapper.formatedTodo(httpResponse);

    expect(expectedTodoResponse).toEqual(formatedToDos)
  })
})
