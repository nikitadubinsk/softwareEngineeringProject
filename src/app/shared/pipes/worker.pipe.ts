import { Pipe, PipeTransform } from '@angular/core';
import { Worker } from 'src/app/app.component';

@Pipe({
  name: 'worker'
})
export class WorkerPipe implements PipeTransform {

  transform(worker: Worker[], search : string = ""): Worker[] {
    if (!search.trim()) {
      return worker
    }

    return worker.filter(w => {
      return w.name.includes(search) || w.email.includes(search) || w.specialization.includes(search)
    })
  }

}
