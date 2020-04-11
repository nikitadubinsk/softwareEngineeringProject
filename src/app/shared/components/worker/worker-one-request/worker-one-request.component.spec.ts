import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerOneRequestComponent } from './worker-one-request.component';

describe('WorkerOneRequestComponent', () => {
  let component: WorkerOneRequestComponent;
  let fixture: ComponentFixture<WorkerOneRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkerOneRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkerOneRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
