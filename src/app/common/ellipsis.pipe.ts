import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ellipsis'
})
export class EllipsisPipe implements PipeTransform {

  transform(value: String, args?: number): String {
    if (!args || value.length < args) {
      return value;
    }
    return value.substring(0, args) + '...';
  }

}
