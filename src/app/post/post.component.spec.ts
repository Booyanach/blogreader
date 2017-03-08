import { Item } from './../common/item';
import { StateService } from './../common/state.service';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, EventEmitter } from '@angular/core';

import { PostComponent } from './post.component';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostComponent ],
      providers: [
        { provide: StateService, useClass: MockStateService }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;

    spyOn(component, 'ngOnInit').and.callThrough();
    spyOn(component, 'getSelectedPost').and.callThrough();
    spyOn(component, 'errorHandler').and.callThrough();
    spyOn(component['stateService'], 'getSelectedItem').and.callThrough();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      component['stateService'].selectedItem.next(<Item>{
        id: 1, userid: 1, title: 'foo', body: 'bar', favorite: false
      });
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('fetches the selectedItem from the StateService on init', () => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();

      expect(component.ngOnInit).toHaveBeenCalled();
      expect(component.getSelectedPost).toHaveBeenCalled();
      expect(component['stateService'].getSelectedItem).toHaveBeenCalled();

      expect(component.item.id).toBe(1);
      expect(component.item.userid).toBe(1);
      expect(component.item.title).toBe('foo');
      expect(component.item.body).toBe('bar');
      expect(component.item.favorite).toBe(false);
    });
  });

  it('should render the title and body', async(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();

      const compiled = fixture.debugElement.nativeElement;
      expect(
        compiled.querySelector('h2').textContent
      ).toContain('foo');
      expect(
        compiled.querySelector('p').textContent
      ).toContain('bar');
    });
  }));
  describe('errorHandler', () => {
    it('throws an error', async(() => {
      spyOn(console, 'error');
      component.errorHandler('abc');
      expect(console.error).toHaveBeenCalledWith('postComponent', 'abc');
    }));
  });
});

class MockStateService {
  selectedItem: EventEmitter<Item>;

  constructor() {
    this.selectedItem =  new EventEmitter();
  }

  public getSelectedItem() {
    return this.selectedItem;
  };
}
