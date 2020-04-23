import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOneRequestComponent } from './admin-one-request.component';

describe('AdminOneRequestComponent', () => {
  let component: AdminOneRequestComponent;
  let fixture: ComponentFixture<AdminOneRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminOneRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOneRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
