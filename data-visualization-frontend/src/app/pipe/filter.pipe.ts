
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], properties: string[], searchText: string): any[] {
    if (!items || !items.length || !searchText || !properties || properties.length === 0) {
      return items;
    }
    searchText = searchText.toString().toLowerCase();
    return items.filter((item) =>
      properties.some((property) => {
        const propValue = item[property];
        if (typeof propValue === 'string') {
          return propValue.toLowerCase().includes(searchText);
        } else if (typeof propValue === 'number') {
          return propValue.toString().includes(searchText);
        } else if (propValue instanceof Date) {
          const dateString = propValue.toISOString().toLowerCase();
          return dateString.includes(searchText);
        }
        return false;
      })
    );
  }
}