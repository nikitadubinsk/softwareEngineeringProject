import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OneWorkerComponent } from './one-worker.component';

describe('OneWorkerComponent', () => {
  let component: OneWorkerComponent;
  let fixture: ComponentFixture<OneWorkerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneWorkerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
