import { Component, OnInit, Input } from '@angular/core';
import { Reauest, Worker } from '../../../../app.component';

@Component({
  selector: 'app-admin-one-request',
  templateUrl: './admin-one-request.component.html',
  styleUrls: ['./admin-one-request.component.css']
})
export class AdminOneRequestComponent implements OnInit {

  @Input() request : Reauest; /** принимаем одну заявку */

  constructor() { }

  ngOnInit() {
  }

}
