import { Injectable } from '@angular/core';
import { JhiFilterPipe, JhiOrderByPipe } from 'ng-jhipster';
@Injectable()
export class CMUtilService {

  constructor(
    private jhiFilterPipe: JhiFilterPipe,
    private jhiOrderByPipe: JhiOrderByPipe
  ) { }

  /**
   * Filters out the attribute with the given property object.
   * @param array The input array of attributes
   * @param obj the filter object. The filter property must be a property of class @link{CMAttribute}
   */
  filterAttributesByObj<T>(array: T[], obj: any): T[] {
    const filteredArray: T[] = [];
    this.jhiFilterPipe.transform(array, Object.assign({}, obj), '').forEach((element: any) => {
      if (element.children && element.children.length > 0) {
        this.filterAttributesByObj(element.children, obj).forEach((item: T) => {
          filteredArray.push(item);
        });
        delete element.children;
      }
      filteredArray.push(element);
    });

    return filteredArray;
  }

  sortArrayByPredicate<T>(array: T[], predicate: string): T[] {
    return this.jhiOrderByPipe.transform(array, predicate);
  }

  convertParamMapStringToNumberArray(value: string, strict: boolean): number[] {
    const result: number[] = value.split(',').map((item) => {
      const i = Number(item);
      if (!strict && !i) {
        // default to '0' if string is non convertible.
        return 0;
      }
      return i;
    });

    // removes duplicates
    return result.filter((i, index, self) => {
      return self.indexOf(i) === index;
    });
  }
}
