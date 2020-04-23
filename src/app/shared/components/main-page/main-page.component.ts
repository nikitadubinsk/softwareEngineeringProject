import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  public mainForm : FormGroup;
  name;
  text = '';
  email;
  status;
  specialization;
  requestCreated = false;

  constructor(private requestServices: RequestService) { }

  ngOnInit() {
    this.mainForm = new FormGroup({   /** активирование формы с новоя заявки */
      status: new FormControl('Новая', []),
      name: new FormControl(' ', [Validators.required, Validators.minLength(1)]),
      text: new FormControl(this.text, [Validators.required, Validators.minLength(1)]),
      email: new FormControl('', [Validators.required, Validators.minLength(1), Validators.email]),
      specialization: new FormControl('', [Validators.required, Validators.minLength(1)]),
    });
  }

  async submit() { /** добавляем новую заявку в БД */
    this.requestCreated = true;    /** показ сообщения о сохранении заявки */
    await this.requestServices.addRequest(this.mainForm.value); /** добавление новой заявки в БД */
    this.mainForm.reset();   /** очищение формы */
  }

  newForm() { /** делаем новую пустую форму для новой заявки */
    this.requestCreated = !this.requestCreated;    /** интерфейс создания новой заявки */
    this.mainForm = new FormGroup({
      status: new FormControl('Новая', []),
      name: new FormControl(this.name, [Validators.required, Validators.minLength(1)]),
      text: new FormControl(this.text, [Validators.required, Validators.minLength(1)]),
      email: new FormControl(this.email, [Validators.required, Validators.minLength(1), Validators.email]),
      specialization: new FormControl(this.specialization, [Validators.required, Validators.minLength(1)]),
    });
  }

}
