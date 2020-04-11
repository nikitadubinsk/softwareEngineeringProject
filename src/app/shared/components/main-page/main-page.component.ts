import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  form : FormGroup;
  name;
  text;
  email;
  status;
  specialization;
  requestCreated = false;

  constructor(private requestServices: RequestService) { }

  ngOnInit() {
    this.form = new FormGroup({
      status: new FormControl('Новая', []),
      name: new FormControl(this.name, [Validators.required, Validators.minLength(1)]),
      text: new FormControl(this.text, [Validators.required, Validators.minLength(1)]),
      email: new FormControl(this.email, [Validators.required, Validators.minLength(1), Validators.email]),
      specialization: new FormControl(this.specialization, [Validators.required, Validators.minLength(1)]),
    });
  }

  async submit() {
    this.requestCreated = true;
    await this.requestServices.addRequest(this.form.value);
    this.form.reset();
  }

  newForm() {
    this.requestCreated = !this.requestCreated;
    this.form = new FormGroup({
      status: new FormControl('Новая', []),
      name: new FormControl(this.name, [Validators.required, Validators.minLength(1)]),
      text: new FormControl(this.text, [Validators.required, Validators.minLength(1)]),
      email: new FormControl(this.email, [Validators.required, Validators.minLength(1), Validators.email]),
      specialization: new FormControl(this.specialization, [Validators.required, Validators.minLength(1)]),
    });
  }

}
