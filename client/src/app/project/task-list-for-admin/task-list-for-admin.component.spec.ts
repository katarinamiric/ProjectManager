import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListForAdminComponent } from './task-list-for-admin.component';

describe('TaskListForAdminComponent', () => {
  let component: TaskListForAdminComponent;
  let fixture: ComponentFixture<TaskListForAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskListForAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListForAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
