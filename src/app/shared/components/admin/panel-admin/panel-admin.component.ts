import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { RequestService } from '../../../services/request.service';
import { WorkerService } from '../../../services/worker.service';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Reauest, Worker } from '../../../../app.component';

@Component({
  selector: 'app-panel-admin',
  templateUrl: './panel-admin.component.html',
  styleUrls: ['./panel-admin.component.css']
})
export class PanelAdminComponent implements OnInit {

  form : FormGroup;
  name;
  email;
  specialization;
  workers = [];
  error;
  i;
  key;
  editWorkerFlag = false;
  allWorkersFlag = true;
  requests = []

  constructor(private requestServices: RequestService, private router: Router, private workerServices: WorkerService) { }

  async ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(this.name, [Validators.required, Validators.minLength(1)]),
      email: new FormControl(this.email, [Validators.required, Validators.minLength(1), Validators.email]),
      specialization: new FormControl(this.specialization, [Validators.required, Validators.minLength(1)]),
    });
    this.workers = await this.workerServices.getAllWorkers();
    this.key = Object.keys(this.workers);
    this.workers = Object.values(this.workers)
    for (this.i=0; this.i<this.key.length; this.i++) {
      this.workers[this.i].id=this.key[this.i];
      console.log(this.workers[this.i].id)
    }
    try {
      this.requests = await this.requestServices.getAllRequest();
      this.requests = Object.values(this.requests)
    } catch(e) {
      console.log(e)
    }
  }

  async submit() { /** добавляем нового сотрудника */
    await this.workerServices.addWorker(this.form.value);
    this.workers.push(this.form.value);
    this.form.reset();
  }

  async logout() { /** производим логаут из административной панели */
    try {
      await firebase.auth().signOut()
    } catch(e) {
      this.error = true
    }
    if (!this.error) {
      this.router.navigate([''])
      localStorage.clear()
    }
  }

  editWorker(worker) { /** редактирование специалиста */
    this.editWorkerFlag = true;
    this.form = new FormGroup({
     name: new FormControl(worker.name, [Validators.required, Validators.minLength(1)]),
     email: new FormControl(worker.email, [Validators.required, Validators.minLength(1), Validators.email]),
     specialization: new FormControl(worker.specialization, [Validators.required, Validators.minLength(1)]),
     id: new FormControl(worker.id, []),
    });
  }

  async saveWorker() { /** сохраняем отредактированного специалиста */
    this.editWorkerFlag = false; /** переключение на интерфейс редактирования */
    try {
      await this.workerServices.editWorker(this.form.value); /** сохраняем измененного специалиста в БД */
      let index = this.workers.findIndex((el)=>el.id==this.form.value.id); 
      this.workers[index] = this.form.value; /** сохраняем специалиста в массиве всех специалистов */
    } catch(e) {
      console.log(e.message)
    }
    this.form.reset();   /** очищение формы */
  }

  async deleteWorker(worker) { /** удаляем специалиста */
    try {
      await this.workerServices.deleteWorker(worker); /** удаление специалиста из БД */
      let index = this.workers.findIndex((el)=>el.id==worker.id); 
      this.workers.splice(index, 1);  /** удаление специалиста из массива со всеми специалистами */
    } catch(e) {
      console.log(e.message); /** вывод сообщения об ошибке */
    }
  }

  changeFlag(number) { /** меняем блоки, которые видны сейчас */
    switch (number) {
      case 1: this.allWorkersFlag = true; break; /** список всех специалистов */
      case 2: this.allWorkersFlag = false; break;     /** список всех заявок */
    }
  }

}
