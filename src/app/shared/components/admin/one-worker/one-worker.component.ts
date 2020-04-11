import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Reauest, Worker } from '../../../../app.component';

@Component({
  selector: 'app-one-worker',
  templateUrl: './one-worker.component.html',
  styleUrls: ['./one-worker.component.css']
})
export class OneWorkerComponent implements OnInit {

  @Input() work;
  @Output() deleteWorker: EventEmitter<Worker> = new EventEmitter<Worker>();
  @Output() editWorker: EventEmitter<Worker> = new EventEmitter<Worker>();

  constructor() { }

  ngOnInit() {
  }

  delete(worker: Worker) {
    this.deleteWorker.emit(worker);
  }

  edit(worker: Worker) {
    this.editWorker.emit(worker);
  }

}
