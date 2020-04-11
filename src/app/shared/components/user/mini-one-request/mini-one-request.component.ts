import { Component, OnInit, Input } from '@angular/core';
import { Reauest, Worker } from '../../../../app.component';

@Component({
  selector: 'app-mini-one-request',
  templateUrl: './mini-one-request.component.html',
  styleUrls: ['./mini-one-request.component.css']
})
export class MiniOneRequestComponent implements OnInit {

  @Input() request : Reauest;

  constructor() { }

  ngOnInit() {
  }

}
