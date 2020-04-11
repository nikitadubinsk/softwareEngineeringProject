import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Reauest, Worker } from '../../../../app.component';

@Component({
  selector: 'app-worker-one-request',
  templateUrl: './worker-one-request.component.html',
  styleUrls: ['./worker-one-request.component.css']
})
export class WorkerOneRequestComponent implements OnInit {

  @Input() request;
  @Output() editRequest: EventEmitter<Reauest> = new EventEmitter<Reauest>();
  editFlag = false;
  form : FormGroup;
  newRequest;

  constructor() { }

  ngOnInit() {
  }

  edit(request: Reauest) {
    this.editFlag = true;
    this.form = new FormGroup({
      status: new FormControl(request.status, [Validators.required, Validators.minLength(1)])
    });
    this.newRequest = request;
  }

  save() {
    this.editFlag = false;
    if (this.form.value.status == 'В работе') {
      this.newRequest.status = this.form.value.status;
      this.newRequest.emailWorker = localStorage['email'];
      delete this.newRequest.dateOfFinish
    }
    if (this.form.value.status == 'Готово') {
      this.newRequest.status = this.form.value.status;
      this.newRequest.dateOfFinish = new Date();
    }
    this.editRequest.emit(this.newRequest);
  }

}
