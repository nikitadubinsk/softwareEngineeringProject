import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { RequestService } from '../../../services/request.service';
import { WorkerService } from '../../../services/worker.service';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import "firebase/auth";

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
  password;
  workers = [];
  error;
  i;
  key;
  editWorkerFlag = false;
  allWorkersFlag = true;
  requests = [];
  search = "";
  fullRequest = [];
  allFlags = [];
  graph =  [];
  allCount = [0, 0, 0];
  view: any[] = [700, 400];
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private requestServices: RequestService, private router: Router, private workerServices: WorkerService) { }

  async ngOnInit() {
    this.form = new FormGroup({   /** создание новой формы для специалиста */
      name: new FormControl(this.name, [Validators.required, Validators.minLength(1)]),
      email: new FormControl(this.email, [Validators.required, Validators.minLength(1), Validators.email]),
      specialization: new FormControl(this.specialization, [Validators.required, Validators.minLength(1)]),
      password: new FormControl(this.password, [Validators.required, Validators.minLength(6)])
    });
    this.workers = await this.workerServices.getAllWorkers();    /** получаем список всех специалистов */
    this.key = Object.keys(this.workers);
    this.workers = Object.values(this.workers)   /** добавляем специалистов в массив */
    for (this.i=0; this.i<this.key.length; this.i++) {
      this.workers[this.i].id=this.key[this.i];    /** добавляем id специалиста из БД */
    }
    try {
      this.requests = await this.requestServices.getAllRequest();   /** получаем список всех заявок */
      this.requests = Object.values(this.requests) /** добавляем все заявки в массив */
      for (let i=0; i<this.requests.length; i++) {
        switch(this.requests[i].status) {
          case 'Новая': this.allCount[0]++;
          case 'В работе': this.allCount[1]++;
          case 'Готово': this.allCount[2]++;
        }
      } 
      this.graph = [
        {"name": 'Новых заявок', "value": this.allCount[0]},
        {"name": 'Заявок в работе', "value": this.allCount[1]},
        {"name": 'Готовых заявок', "value": this.allCount[2]}
      ]  
    } catch(e) {
      console.log(e)
    }
    this.fullRequest = [...this.requests];
    for (let i=0; i<3; i++) {
      this.allFlags[i] = false;
    }
  }

  async submit() { /** добавляем нового сотрудника */
    await this.workerServices.addWorker(this.form.value);    /** добавляем нового сотрудника в БД */
    await firebase.auth().createUserWithEmailAndPassword(this.form.value.email, this.form.value.password)   /** добавляем нового сотрудника в сервис для авторизации */
    this.workers.push(this.form.value);   /** добавляем нового сотрудника в массив со всеми специалистами */
    this.form.reset();     /** очистка формы */
  }

  async logout() { /** производим логаут из административной панели */
    try {
      await firebase.auth().signOut()    /** производим логаут из административной панели */
    } catch(e) {
      this.error = true
    }
    if (!this.error) {
      this.router.navigate([''])
      localStorage.clear()
    }
  }

  editWorker(worker) { /** редактирование специалиста */
    this.editWorkerFlag = true;   /** активизация интерфейса редактирования */
    this.form = new FormGroup({   /** создание формы для редактироввния */
     name: new FormControl(worker.name, [Validators.required, Validators.minLength(1)]),
     email: new FormControl(worker.email, [Validators.required, Validators.minLength(1), Validators.email]),
     specialization: new FormControl(worker.specialization, [Validators.required, Validators.minLength(1)]),
     id: new FormControl(worker.id, []),
     password: new FormControl(worker.password, [Validators.required, Validators.minLength(6)]),
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

  showRequest(number) {   /** показать только определенные заявки */
    if (number == 0) {
      if (this.allFlags[0]) {
        this.requests = [...this.fullRequest];
        this.allFlags[0] = false;
      } else {
        this.requests = [...this.fullRequest];
        this.allFlags[0] = true;
        this.allFlags[1] = false;
        this.allFlags[2] = false;
        for (let i=0; i<this.requests.length; i++) {
          if (this.requests[i].status != 'Новая') {
            this.requests.splice(i, 1);
          }
        };
      }; 
    } else 
    if (number == 1) {
      if (this.allFlags[1]) {
        this.requests = [...this.fullRequest];
        this.allFlags[1] = false;
      } else {
        this.requests = [];
        this.allFlags[0] = false;
        this.allFlags[1] = true;
        this.allFlags[2] = false;
        for (let i=0; i<this.fullRequest.length; i++) {
          if (this.fullRequest[i].status == "В работе") {
            this.requests.push(this.fullRequest[i]);
          }
        };
      }; 
    } else 
    if (number == 2) {
      if (this.allFlags[2]) {
        this.requests = [...this.fullRequest];
        this.allFlags[2] = false;
      } else {
        this.requests = [];
        this.allFlags[0] = false;
        this.allFlags[1] = false;
        this.allFlags[2] = true;
        for (let i=0; i<this.fullRequest.length; i++) {
          if (this.fullRequest[i].status == 'Готово') {
            this.requests.push(this.fullRequest[i]);
          }
        };
      }; 
    }   
  }

}
