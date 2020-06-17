import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowsecodesComponent } from './browsecodes.component';

describe('BrowsecodesComponent', () => {
  let component: BrowsecodesComponent;
  let fixture: ComponentFixture<BrowsecodesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowsecodesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowsecodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
