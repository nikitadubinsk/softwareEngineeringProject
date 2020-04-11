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
    this.email = localStorage['email'];
    this.form = new FormGroup({
      status: new FormControl('Новая', []),
      name: new FormControl(this.name, [Validators.required, Validators.minLength(1)]),
      text: new FormControl(this.text, [Validators.required, Validators.minLength(1)]),
      email: new FormControl(this.email, []),
      specialization: new FormControl(this.specialization, [Validators.required, Validators.minLength(1)]),
    });
    try {
      this.allRequest = await this.requestServices.getAllRequest();
      this.allRequest = Object.values(this.allRequest);
      for (this.i=0; this.i<this.allRequest.length; this.i++) {
        if (this.allRequest[this.i].email == this.email) {
          this.myRequest.push(this.allRequest[this.i]);
        }
      }
    } catch(e) {
      console.log(e)
    }
  }

  async submit() {
    try {
      await this.requestServices.addRequest(this.form.value);
      this.myRequest.push(this.form.value);
      this.form.reset();
    } catch(e) {
      console.log(e);
    }
  }

  logout() {
    localStorage.clear;
  }

}
