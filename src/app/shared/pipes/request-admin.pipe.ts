import { Pipe, PipeTransform } from '@angular/core';
import { Reauest } from 'src/app/app.component';

@Pipe({
  name: 'requestAdmin'
})
export class RequestAdminPipe implements PipeTransform {

  transform(request: Reauest[], search : string = ""): Reauest[] {
    if (!search.trim()) {
      return request
    }

    return request.filter(r => {
      return r.name.includes(search) || r.text.includes(search)
    })
  }

}
