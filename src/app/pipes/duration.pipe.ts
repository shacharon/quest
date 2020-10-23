import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(value: number, ...args: any[]): any {
    var number = Math. floor(value/60); 
    var remainder = value % 60; 
    return number+"h" + " " + remainder + "m";
  }

}
