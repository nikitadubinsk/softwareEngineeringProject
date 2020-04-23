import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import * as firebase from "firebase/app";
import "firebase/auth";
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-worker',
  templateUrl: './login-worker.component.html',
  styleUrls: ['./login-worker.component.css']
})
export class LoginWorkerComponent implements OnInit {

  form : FormGroup;
  email;
  password;
  error = false;
  public error$: Subject<string> = new Subject<string>()

  constructor(private router: Router) { }

  ngOnInit() {    /** активация формы для авторизации */
    this.form = new FormGroup({
      email: new FormControl(this.email, [Validators.required, Validators.minLength(1), Validators.email]),
      password: new FormControl(this.password, [Validators.required, Validators.minLength(6)]),
    });
  }

  async submit() { /** авторизация специалиста, если корректно - переход в панель специалиста, если нет - вывод сообщения об ошибке */
    this.error = false;
    try {
      await firebase.auth().signInWithEmailAndPassword(this.form.value.email, this.form.value.password)   /** проверка введенных данных */
    } catch(e) {
      this.error$.next(e.message)   /** сохранение информации об ошибке */
      this.error = true;
    }
    if (!this.error) {
      localStorage.setItem('email', this.form.value.email)
      this.router.navigate(['/worker'])   /** переадресация на административную страницу специалиста */
    }
  }

}
