/* tslint:disable:no-unused-variable */
import { DebugElement, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { EllipsisPipe } from './../common/ellipsis.pipe';
import { ItemComponent } from './item.component';
import { Item } from '../common/item';

describe('ItemComponent', () => {
  let parent: TestWrapperComponent;
  let component: ItemComponent;
  let fixture: ComponentFixture<TestWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestWrapperComponent,
        ItemComponent,
        EllipsisPipe
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestWrapperComponent);
    parent = fixture.componentInstance;
    component = fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a populated item', () => {
    expect(component.item.id).toBe(1);
    expect(component.item.userid).toBe(1);
    expect(component.item.title).toBe('foo');
    expect(component.item.body).toBe('bar');
    expect(component.item.favorite).toBe(false);
  });
  it('should render the title', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(
      compiled.querySelector('app-item').textContent
    ).toContain('foo');
  }));

  it('should render the title with ellipsis if too long', async(() => {
    component.item.title = '12345678901234567890';
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    expect(
      compiled.querySelector('app-item').textContent
    ).toContain('123456789012345678...');
  }));

  it('should have the hollow heart when not favorite', async(() => {
    const compiled = fixture.debugElement.nativeElement;

    expect(
      compiled.querySelector('.favorite > i').className
    ).toContain('fa fa-heart-o');
  }));

  it('should have the filled heart when favorite', async(() => {
    component.item.favorite = true;

    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;

    expect(
      compiled.querySelector('.favorite > i').className
    ).toContain('fa fa-heart');
  }));

  it('should call setFavorite when the icon is clicked and change it', async(() => {
    spyOn(component, 'setFavorite').and.callThrough();
    const compiled = fixture.debugElement.nativeElement;

    const icon = compiled.querySelector('app-item > .favorite');
    icon.click();

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.setFavorite).toHaveBeenCalled();
      expect(component.item.favorite).toBe(true);
      expect(compiled.querySelector('.favorite > i').className).toBe('fa fa-heart');
    });
  }));
});

@Component({
  selector: 'app-test-component-wrapper',
  template: '<app-item [item]="item"></app-item>'
})
class TestWrapperComponent {
  item: Item = <Item>{
    id: 1, userid: 1, title: 'foo', body: 'bar', favorite: false
  };
}
