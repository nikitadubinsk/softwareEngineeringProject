import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {

  form : FormGroup;
  email;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {   /** создание формы авторизации */
    this.form = new FormGroup({
      email: new FormControl(this.email, [Validators.required, Validators.minLength(1), Validators.email])
    });
  }

  async submit() { /** авторизация пользователя по email */
      localStorage.setItem('email', this.form.value.email)  /** добавление в localStorage email */
      this.router.navigate(['/user'])     /** адресация в личный кабинет */
  }

}
