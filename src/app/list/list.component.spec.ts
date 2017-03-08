import { Item } from './../common/item';
import { StateService } from './../common/state.service';
import { EllipsisPipe } from './../common/ellipsis.pipe';
import { ItemComponent } from './../item/item.component';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Component, EventEmitter, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ListComponent
      ],
      providers: [
        { provide: StateService, useClass: MockStateService }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;

    spyOn(component, 'ngOnInit').and.callThrough();
    spyOn(component, 'getItems').and.callThrough();
    spyOn(component, 'selectPost').and.callThrough();
    spyOn(component['stateService'], 'getState').and.callThrough();
    spyOn(component['stateService'], 'selectItem').and.callThrough();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('fetches the items from the StateService on init', () => {
    fixture.detectChanges();
    expect(component.ngOnInit).toHaveBeenCalled();
    expect(component.getItems).toHaveBeenCalled();
    expect(component['stateService'].getState).toHaveBeenCalled();

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.items[0].id).toBe(1);
      expect(component.items[0].userid).toBe(1);
      expect(component.items[0].title).toBe('foo');
      expect(component.items[0].body).toBe('bar');
      expect(component.items[0].favorite).toBe(false);
    });
  });
  it('should render a bunch of app-item components', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(compiled.querySelectorAll('app-item').length).toBe(1);
    });
  }));
  it('should call selectPost when the list item is clicked', async(() => {
    const compiled = fixture.debugElement.nativeElement;

    fixture.whenStable().then(() => {
      // Load items
      fixture.detectChanges();
      const appItem = compiled.querySelector('app-item');
      appItem.click();

      fixture.detectChanges();

      fixture.whenStable().then(() => {
        // Load click event
        expect(component.selectPost).toHaveBeenCalled();
        expect(
          component['stateService'].selectItem
        ).toHaveBeenCalledWith(component.items[0]);
      });
    });
  }));

});

class MockStateService {
  selectedItem: EventEmitter<Item>;
  state: Item[] = [
    <Item>{id: 1, userid: 1, title: 'foo', body: 'bar', favorite: false}
  ];

  constructor() {
    this.selectedItem =  new EventEmitter();
  }
  
  public getState() {
    return new Promise((resolve, reject) => {
      resolve(this.state);
    });
  };

  public getSelectedItem() {
    return this.selectedItem;
  }

  public selectItem() {}
}
