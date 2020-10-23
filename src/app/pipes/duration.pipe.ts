import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(value: number, ...args: any[]): string {
    var hours = Math. floor(value/60); 
    var minutes = value % 60; 
    return `${hours}h ${minutes}m` ;
  }

}
