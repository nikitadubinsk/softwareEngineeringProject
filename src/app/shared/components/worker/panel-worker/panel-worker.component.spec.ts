import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelWorkerComponent } from './panel-worker.component';

describe('PanelWorkerComponent', () => {
  let component: PanelWorkerComponent;
  let fixture: ComponentFixture<PanelWorkerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelWorkerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
