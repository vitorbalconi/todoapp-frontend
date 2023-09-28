import { TestBed } from '@angular/core/testing';
import { TodoRepositoryService } from './todo-repository.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpHeaders } from '@angular/common/http';
import { Priority, PriorityUtil } from '../enums/priority.enum';
import { urlConfig } from 'src/app/config/url.config';
import { newToDoMock, toDoResponseMock, toDosFormatedDateMock, toDosMock, toDosReponseFormatedDateMock } from 'src/__mocks__/todo.mock';

describe('TodoRepositoryService', () => {
  let service: TodoRepositoryService;
  let httpTestingController: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(TodoRepositoryService);
    httpTestingController = TestBed.inject(HttpTestingController);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('return todos', () => {

    const currentPage = 1;
    const limit = 1;
    const priority = PriorityUtil.getKey(Priority.HIGH)!;
    const description = 'test';
    const expectedUrl = `${urlConfig.urlTodo}`
    const expectedParams = `?_page=${currentPage}&_limit=${limit}&priority=${priority}&description=${description}`
    const mockLinkHeader = `<http://localhost:3000/todos?_page=${toDoResponseMock.firstPage}&_limit=${limit}>; rel="first", <http://localhost:3000/todos?_page=${toDoResponseMock.lastPage}&_limit=${limit}>; rel="next", <http://localhost:3000/todos?_page=${toDoResponseMock.lastPage}&_limit=${limit}>; rel="last"`;
    let headers = new HttpHeaders().set('Link', mockLinkHeader)

    service.getToDos(currentPage, limit, priority, description)
    .subscribe(data => {
      console.log(data)
      console.log()
      expect(data).toEqual(toDosReponseFormatedDateMock)
    });

    const req = httpTestingController.expectOne(expectedUrl + expectedParams)

    expect(req.request.method).toEqual('GET')

    req.flush(toDosMock, { headers });

    httpTestingController.verify();

  })

  it('add ToDo', () => {
    const expectedUrl = `${urlConfig.urlTodo}`
    const newTodo = newToDoMock

    service.addToDo(newTodo).subscribe();

    const req = httpTestingController.expectOne(expectedUrl);

    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(newTodo);

    req.flush({});

    httpTestingController.verify();

  });

  it('doUndo Task', () => {
    const expectedUrl = `${urlConfig.urlTodo}`;
    const toDo = toDosFormatedDateMock[0];

    const done  = !toDo.done

    service.doUndoTask(toDo).subscribe();

    const req = httpTestingController.expectOne(`${expectedUrl}/${toDo.id}`);

    expect(req.request.method).toEqual('PATCH');
    expect(req.request.body).toEqual({ done });

    req.flush({});

    httpTestingController.verify();

  });

  it('delete Task', () => {
    const expectedUrl = `${urlConfig.urlTodo}`
    const toDo = toDosFormatedDateMock[0];

    service.deleteTask(toDo).subscribe();

    const req = httpTestingController.expectOne(`${expectedUrl}/${toDo.id}`);

    expect(req.request.method).toEqual('DELETE');

    req.flush({});

    httpTestingController.verify();

  });

});
