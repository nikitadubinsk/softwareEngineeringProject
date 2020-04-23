import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule, Validators, FormBuilder } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { LoginWorkerComponent } from './login-worker.component';

describe('LoginWorkerComponent', () => {
  let component: LoginWorkerComponent;
  let fixture: ComponentFixture<LoginWorkerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginWorkerComponent ],
      imports: [ FormsModule, ReactiveFormsModule, HttpClientModule, BrowserModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create form with password', () => {
    expect(component.form.contains('password')).toBe(true);
  });

  it ('should be min length of password', () => {
    const control = component.form.get('password');
    control.setValue('1234');
    expect(control.valid).toBeFalsy();
  });
});

