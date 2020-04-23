import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniOneRequestComponent } from './mini-one-request.component';

describe('MiniOneRequestComponent', () => {
  let component: MiniOneRequestComponent;
  let fixture: ComponentFixture<MiniOneRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiniOneRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniOneRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
