import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../../services/request.service';
import { Reauest, Worker } from '../../../../app.component';

@Component({
  selector: 'app-panel-worker',
  templateUrl: './panel-worker.component.html',
  styleUrls: ['./panel-worker.component.css']
})
export class PanelWorkerComponent implements OnInit {

  email;
  myRequestFlag = true;
  spec;
  allRequest;
  keys;
  newRequest = [];
  myRequest = [];

  constructor(private requestServices: RequestService) { }

  async ngOnInit() {
    this.email = localStorage['email'];      /** получение email */
    this.spec = await this.requestServices.getSpecializationForEmail(this.email);    /** получение специализации специалиста по его email */
    this.allRequest = await this.requestServices.getAllRequest();  /** получение списка всех заявок */
    this.keys = Object.keys(this.allRequest);
    this.allRequest = Object.values(this.allRequest);   /** обработка полученного массива данных */
    for (let i=0; i<this.allRequest.length; i++) {
      this.allRequest[i].id = this.keys[i];
      if (this.allRequest[i].status == 'Новая' && this.allRequest[i].specialization == this.spec) {
        this.newRequest.push(this.allRequest[i])    /** добавление в массив со всеми новыми заявками */
      }
      if (this.allRequest[i].emailWorker == this.email) {
        this.myRequest.push(this.allRequest[i]);    /** добавление в массив со всеми заявками специалиста */
      }
    }
  }

  logout() { /** логаут из панели специалиста */
    localStorage.clear;
  }

  changeFlag(number) { /** меняем блоки, которые в данный момент видны */
    switch (number) {
      case 1: this.myRequestFlag = true; break;   /** список моих заявок */
      case 2: this.myRequestFlag = false; break;    /** список всех новых заявок */
    }
  }

  async editRequest(request) {    /** изменение заявки специалистом */
    await this.requestServices.editRequest(request);   /** сохранение изменений в БД */
    if (request.status == 'В работе') {
      this.myRequest.push(request);
      let index = this.newRequest.findIndex((el)=>el.id==request.id); 
      this.newRequest.splice(index, 1);   /** изменение в массиве всех заявок */
    }
  }

}
