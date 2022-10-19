import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowresponsesComponent } from './showresponses.component';

describe('ShowresponsesComponent', () => {
  let component: ShowresponsesComponent;
  let fixture: ComponentFixture<ShowresponsesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowresponsesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowresponsesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
