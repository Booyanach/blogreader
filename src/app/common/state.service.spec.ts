import { Observable } from 'rxjs/Observable';
/* tslint:disable:no-unused-variable */
import {
  HttpModule,
  Http,
  BaseRequestOptions,
  XHRBackend,
  ResponseOptions
} from '@angular/http';
import { TestBed, async, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { StateService } from './state.service';
import { Item } from './item';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/share';

const mockResponse: Item[] = [
  <Item>{id: 1, userid: 1, title: 'foo', body: 'bar', favorite: false}
];

describe('StateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        StateService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  });

  it('should be initialized', async(inject(
    [StateService, XHRBackend],
    (service: StateService, backend: MockBackend) => {
      backend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });
      expect(service).toBeTruthy();
      expect(service.url).toBe('http://jsonplaceholder.typicode.com/posts');
    }
  )));

  it(
    'should populate state when getState is called',
    async(inject(
      [StateService, XHRBackend],
      (service: StateService, backend: MockBackend) => {
        backend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })));
        });

        spyOn(service, 'callApi').and.callFake((a, b) => {
          expect(a).toBe(service.url);
          b({json: () => mockResponse});
        });

        service.getState().then((state) => {
          expect(service.state).toBe(mockResponse);
        });
  })));

  it(
    'getSelectedItem returns the current selected item',
    async(inject(
      [StateService, XHRBackend],
      (service: StateService, backend: MockBackend) => {
        service.getSelectedItem().subscribe(x => {
          service.selectedItem.subscribe(y => {
            expect(x).toBe(y);
          });
        });
        expect(service.getSelectedItem()).toBe(service.selectedItem);
  })));

  it(
    'selectItem changes the current selected item',
    async(inject(
      [StateService, XHRBackend],
      (service: StateService, backend: MockBackend) => {
        service.selectItem(mockResponse[0]);
        service.selectedItem.subscribe(x => {
          expect(x).toBe(mockResponse[0]);
        });
  })));

  it(
    'callApi calls http to get a new state',
    async(inject(
      [StateService, XHRBackend],
      (service: StateService, backend: MockBackend) => {
        spyOn(service['http'], 'get').and.callFake(() => {
          return {
            'toPromise': () => {
              return {
                then: () => {
                  return {
                    catch: () => {}
                  };
                }
              };
            }
          };
        });

        service.getState();
        expect(service['http'].get).toHaveBeenCalled();
  })));

  describe('errorHandler', () => {
    it('throws an error', async(inject(
      [StateService, XHRBackend],
      (service: StateService, backend: MockBackend) => {
      spyOn(console, 'error');
      service.errorHandler('abc').catch(e => {
        expect(e).toBe('abc');
      });
      expect(console.error).toHaveBeenCalledWith('stateService', 'abc');
    })));
  });
});
