import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultformComponent } from './defaultform.component';

describe('DefaultformComponent', () => {
  let component: DefaultformComponent;
  let fixture: ComponentFixture<DefaultformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
