import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import * as firebase from "firebase/app";
import "firebase/auth";
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {

  @Input() form: FormGroup
  email;
  password;
  error = false;
  public error$: Subject<string> = new Subject<string>()

  constructor(private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({                        /** создание новой формы */
      email: new FormControl(this.email, [Validators.required, Validators.minLength(1), Validators.email]),
      password: new FormControl(this.password, [Validators.required, Validators.minLength(6)]),
    });
  }

  async submit() { /** проверяем данные пользователеля на правильность и в случае корректности отправляем на административную панель, а случае некорректности - выводим сообщение об ошибке */
    this.error = false;
    try {
      await firebase.auth().signInWithEmailAndPassword(this.form.value.email, this.form.value.password)  /** проверка введенных данных */
    } catch(e) {
      this.error$.next(e.message)
      this.error = true;
    }
    if (!this.error) {
      localStorage.setItem('email', this.form.value.email)     /** добавление в localStorage информации о администраторе */
      this.router.navigate(['/admin'])     /** переход на административную панель */
    }
  }

}
