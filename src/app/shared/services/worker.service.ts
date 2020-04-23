import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {

  constructor(private http: HttpClient) { }

  addWorker(worker: Worker) { /** добавить нового специалиста */
    return this.http.post(`https://customerservice-7dd1f.firebaseio.com/workers.json`, worker).toPromise()
  }

  getAllWorkers() { /** получить всех специалистов */
    return this.http.get<Worker[]>(`https://customerservice-7dd1f.firebaseio.com/workers.json`).toPromise();
  }

  deleteWorker(worker) { /** удалить одного специалиста */
    return this.http.delete<void>(`https://customerservice-7dd1f.firebaseio.com/workers/${worker.id}.json`).toPromise();
  }

  editWorker(worker) { /** редактировать одного специалиста */
    return this.http.patch<Worker[]>(`https://customerservice-7dd1f.firebaseio.com/workers/${worker.id}.json`, worker).toPromise();
  }
}
