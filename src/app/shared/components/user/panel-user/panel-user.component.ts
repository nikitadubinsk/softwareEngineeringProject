import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../../services/request.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Reauest, Worker } from '../../../../app.component';

@Component({
  selector: 'app-panel-user',
  templateUrl: './panel-user.component.html',
  styleUrls: ['./panel-user.component.css']
})
export class PanelUserComponent implements OnInit {

  email;
  allRequest = [];
  key = [];
  i;
  myRequest = [];
  form : FormGroup;
  name;
  text;
  status;
  specialization;

  constructor(private requestServices: RequestService) { }

  async ngOnInit() {
    this.email = localStorage['email'];     /** получаем email */
    this.form = new FormGroup({     /** создание формы для новой заявки */
      status: new FormControl('Новая', []),
      name: new FormControl(this.name, [Validators.required, Validators.minLength(1)]),
      text: new FormControl(this.text, [Validators.required, Validators.minLength(1)]),
      email: new FormControl(this.email, []),
      specialization: new FormControl(this.specialization, [Validators.required, Validators.minLength(1)]),
    });
    try {
      this.allRequest = await this.requestServices.getAllRequest();    /** получаем список всех заявок */
      this.allRequest = Object.values(this.allRequest);    /** обработка полученных данных */
      for (this.i=0; this.i<this.allRequest.length; this.i++) {
        if (this.allRequest[this.i].email == this.email) {
          this.myRequest.push(this.allRequest[this.i]);    /** добавление в массив всех заявок */
        }
      }
    } catch(e) {
      console.log(e)
    }
  }

  async submit() { /** добавление новой заявки авторизованным пользователем */
    try {
      await this.requestServices.addRequest(this.form.value);   /** добавлоение заявки в БД */
      this.myRequest.push(this.form.value);   /**добавление заявки в массив со всеми заявками  */
      this.form.reset();    /** очищение формы */
    } catch(e) {
      console.log(e);   /** вывод ошибки */
    }
  }

  logout() { /** логаут из личного кабинета пользователя */
    localStorage.clear;
  }

}
