import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import * as firebase from "firebase/app";
import "firebase/auth";
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {

  form : FormGroup;
  email;
  password;
  error = false;
  public error$: Subject<string> = new Subject<string>()

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(this.email, [Validators.required, Validators.minLength(1), Validators.email]),
      password: new FormControl(this.password, [Validators.required, Validators.minLength(6)]),
    });
  }

  async submit() {
    this.error = false;
    try {
      await firebase.auth().signInWithEmailAndPassword(this.form.value.email, this.form.value.password)
    } catch(e) {
      this.error$.next(e.message)
      this.error = true;
    }
    if (!this.error) {
      localStorage.setItem('email', this.form.value.email)
      this.router.navigate(['/admin'])
    }
  }

}
