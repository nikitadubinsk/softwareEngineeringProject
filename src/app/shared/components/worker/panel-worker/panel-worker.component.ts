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
    this.email = localStorage['email'];
    this.spec = await this.requestServices.getSpecializationForEmail(this.email);
    this.allRequest = await this.requestServices.getAllRequest();
    this.keys = Object.keys(this.allRequest);
    this.allRequest = Object.values(this.allRequest);
    for (let i=0; i<this.allRequest.length; i++) {
      this.allRequest[i].id = this.keys[i];
      if (this.allRequest[i].status == 'Новая' && this.allRequest[i].specialization == this.spec) {
        this.newRequest.push(this.allRequest[i])
      }
      if (this.allRequest[i].emailWorker == this.email) {
        this.myRequest.push(this.allRequest[i]);
      }
    }
  }

  logout() {
    localStorage.clear;
  }

  changeFlag(number) {
    switch (number) {
      case 1: this.myRequestFlag = true; break;
      case 2: this.myRequestFlag = false; break;
    }
  }

  async editRequest(request) {
    await this.requestServices.editRequest(request);
    if (request.status == 'В работе') {
      this.myRequest.push(request);
      let index = this.newRequest.findIndex((el)=>el.id==request.id); 
      this.newRequest.splice(index, 1);
    }
  }

}
