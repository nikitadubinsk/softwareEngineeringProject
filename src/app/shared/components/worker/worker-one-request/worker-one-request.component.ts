import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Reauest } from '../../../../app.component';

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

  edit(request: Reauest) { /** редактирование статуса заявки */
    this.editFlag = true;
    this.form = new FormGroup({    /** создание формы для редактирования */
      status: new FormControl(request.status, [Validators.required, Validators.minLength(1)])
    });
    this.newRequest = request;
  }

  save() { /** сохранение отредактированной заявки */
    this.editFlag = false;   /** интерфейс редактирования */
    if (this.form.value.status == 'В работе') {   /** если статус меняется на "в работе" */
      this.newRequest.status = this.form.value.status;
      this.newRequest.emailWorker = localStorage['email'];  
      delete this.newRequest.dateOfFinish
    }  
    if (this.form.value.status == 'Готово') {     /** если статус меняем на "готово" */
      this.newRequest.status = this.form.value.status;
      this.newRequest.dateOfFinish = new Date();
    }
    this.editRequest.emit(this.newRequest);   /** передача дейставия */
  }

}
