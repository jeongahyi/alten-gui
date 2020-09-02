import { Pipe, PipeTransform } from '@angular/core';
import { VehicleInfo } from './models/vehicle-info';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(items: VehicleInfo[], filter: string): any {
    if (!items || !filter) {
      return items;
    }

    // filter by matching input string
    return items.filter(item => {
      if (item.id.toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
        return item;
      }
      if (item.vehicle_id.toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
        return item;
      }
      if (item.status.toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
        return item;
      }
      if (item.registration_number.toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
        return item;
      }
      if (item.owner_name.toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
        return item;
      }
    });
  }

}
