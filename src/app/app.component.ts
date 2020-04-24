import { Component } from '@angular/core';
import * as firebase from "firebase/app";
import "firebase/auth";

export interface Reauest {   /** интерфейс для заявки */
  name: string,
  text: string,
  email: string,
  emailWorker?: string,
  status: string,
  specialization: string,
  dateOfFinish?: Date,
  id?: string
}

export interface Worker {   /** интерфейс для специалиста */
  id?: string,
  name: string,
  email: string,
  specialization: string,
  password?: string
} 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  firebaseConfig = {
    apiKey: "AIzaSyCpg-pegh1uS6gdvAdhPYejpXz3yr3dgFI",
    authDomain: "customerservice-7dd1f.firebaseapp.com",
    databaseURL: "https://customerservice-7dd1f.firebaseio.com",
    projectId: "customerservice-7dd1f",
    storageBucket: "customerservice-7dd1f.appspot.com",
    messagingSenderId: "211657198805",
    appId: "1:211657198805:web:df9d9b7961f5b855dd265c",
    measurementId: "G-GL51HLN53C"
  };

  ngOnInit() {   
    firebase.initializeApp(this.firebaseConfig);    /** инициалируем firebase */
  }
}
