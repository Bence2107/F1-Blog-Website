import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return ''; // Handle empty values
    return value.split('T')[0].replace(/-/g, '.') + '.';
  }
}
