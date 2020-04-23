import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule, Validators, FormBuilder } from '@angular/forms';

import { LoginAdminComponent } from './login-admin.component';

describe('LoginAdminComponent', () => {
  let component: LoginAdminComponent;
  let fixture: ComponentFixture<LoginAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginAdminComponent ],
      imports: [ FormsModule, ReactiveFormsModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create form with email', () => {
    expect(component.form.contains('email')).toBe(true);
  });

  it ('should be valid email', () => {
    const control = component.form.get('email');
    control.setValue('example@');
    expect(control.valid).toBeFalsy();
  });
});
