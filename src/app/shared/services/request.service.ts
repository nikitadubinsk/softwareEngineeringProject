import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  allWolkers: any = [];

  constructor(private http: HttpClient) { }

  addRequest(request: Request) { /** добавить новую заявку */
    return this.http.post(`https://customerservice-7dd1f.firebaseio.com/request.json`, request).toPromise()
  }

  editRequest(request) { /** редактировать заявку */
    return this.http.patch<Request[]>(`https://customerservice-7dd1f.firebaseio.com/request/${request.id}.json`, request).toPromise();
  }

  getAllRequest() { /** получить все заявки */
    return this.http.get<Request[]>(`https://customerservice-7dd1f.firebaseio.com/request.json`).toPromise();
  }

  async getSpecializationForEmail(email) { /** узнать специализацию специалиста по email */
    this.allWolkers = await this.http.get(`https://customerservice-7dd1f.firebaseio.com/workers.json`).toPromise();
    this.allWolkers = Object.values(this.allWolkers)   /** получение списка всех специалистов */
    for (let i=0; i<this.allWolkers.length; i++) {
      if (this.allWolkers[i].email == email) {
        return this.allWolkers[i].specialization;   /** получение нужной специализации по email */
      }
    }
  }
}
