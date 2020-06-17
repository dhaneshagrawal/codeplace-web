import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllcodesComponent } from './allcodes.component';

describe('AllcodesComponent', () => {
  let component: AllcodesComponent;
  let fixture: ComponentFixture<AllcodesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllcodesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllcodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
