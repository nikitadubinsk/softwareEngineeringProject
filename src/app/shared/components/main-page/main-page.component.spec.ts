import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RequestService } from '../../services/request.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { MainPageComponent } from './main-page.component';

describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainPageComponent ],
      imports: [ FormsModule, ReactiveFormsModule, HttpClientModule, BrowserModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
;  });

  it('should create form with text', () => {
    expect(component.mainForm.contains('text')).toBe(true);
  });

  it ('should be required text', () => {
    const control = component.mainForm.get('text');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });

});
