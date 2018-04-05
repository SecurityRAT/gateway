import { Injectable } from '@angular/core';

@Injectable()
export class CMUtilService {

  constructor(
  ) { }

  filterSelectedItemsInNestedArray<T>(array: T[]): T[] {

    const filteredArray: T[] = [];

    array.filter((elem: any) => elem.selected === true).forEach((element: any) => {
      if (element.children && element.children.length > 0) {
        this.filterSelectedItemsInNestedArray(element.children).forEach((item: T) => {
          filteredArray.push(item);
        });
      }
      delete element.children;
      filteredArray.push(element);
    });

    return filteredArray;
  }

  sortArrayByShowOrder<T>(array: T[]): T[] {
    return array.sort((item1: any, item2: any) => {
      return item1.showOrder - item2.showOrder;
    });
  }
}
