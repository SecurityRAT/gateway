import { Injectable } from '@angular/core';
import { JhiFilterPipe, JhiOrderByPipe } from 'ng-jhipster';
import { CMAttribute, CMRequirement } from '..';
@Injectable()
export class CMUtilService {
  constructor(private jhiFilterPipe: JhiFilterPipe, private jhiOrderByPipe: JhiOrderByPipe) {}

  /**
   * Recursively filter an array with the given property object.
   * @param {T} array The input array of attributes
   * @param {any} filterObj the filter object.
   */
  filterByObj<T>(array: T[], filterObj: any): T[] {
    if (filterObj === undefined || (array !== undefined && array.length === 0)) {
      return array;
    }
    const filteredArray: T[] = [];
    /* go through the children */
    array.forEach((elem: any) => {
      if (elem.children && elem.children.length > 0) {
        this.filterByObj(elem.children, filterObj).forEach((item: any) => {
          filteredArray.push(Object.assign({}, item));
        });
      }
    });
    /* Go through the top level array */
    this.jhiFilterPipe.transform(array, Object.assign({}, filterObj), '').forEach((element: any) => {
      filteredArray.push(Object.assign({}, element));
    });

    return filteredArray;
  }

  updatePropertyInArray<T>(array: T[], propertyObj, specificIds?: number[]): void {
    if (propertyObj !== undefined) {
      const key = Object.keys(propertyObj)[0];
      array.forEach((elem: any) => {
        if (elem.children && elem.children.length > 0) {
          this.updatePropertyInArray(elem.children, propertyObj, specificIds);
        }

        if (specificIds === undefined || (specificIds !== undefined && specificIds.length > 0 && specificIds.includes(elem.id))) {
          elem[key] = propertyObj[key];
          // elem = Object.assign({}, elem);
        }
      });
    }
  }

  /**
   * Filters the requirements depending on a list of selected feTags by updating the 'viewOption.show' of the requirement.
   * @param {Array<CMRequirement>} array The list of requirements.
   * @param {any} selectedTags The selectedTag object in the form {'$tagCategory.id': [list of selected tag ids to this category] }
   */
  filterRequirementsByFeTags(array: CMRequirement[], selectedTags: any): CMRequirement[] {
    const tagCategories: string[] = Object.keys(selectedTags);
    if (tagCategories.length > 0) {
      /* Iterate through the requirements presently shown */
      array.forEach(req => {
        if (req.viewOptions.show) {
          let count = 0;
          /* A valid requirement must have atleast one selected Tag from each category. */
          for (let i = 0; i < tagCategories.length; i++) {
            const tagCategory = tagCategories[i];
            for (let j = 0; j < req.feTags.length; j++) {
              const reqTagId = req.feTags[j];
              /* tag is present in the selectTags of a category, then increment the count */
              if (selectedTags[tagCategory].length === 0 || selectedTags[tagCategory].includes(reqTagId)) {
                count++;
                break;
              }
            }
            /* filter out requirement and break if count is already less than the number of tagCategories processed */
            if (count < i + 1) {
              req.viewOptions.show = false;
              // no need to evaluate the following tagCategories
              break;
            }
          }
        }
      });
    }

    return array;
  }

  /**
   * Filters the requirements depending on a list of selected categories by updating the 'viewOption.show' of the requirement.
   * @param {CMRequirement} array The list of requirements.
   * @param {Array<number>} selectedCategoriesIds The list of selected categories ids.
   */
  filterRequirementsByCategories(array: CMRequirement[], selectedCategoriesIds: number[]): CMRequirement[] {
    if (selectedCategoriesIds !== undefined && selectedCategoriesIds.length > 0) {
      array.forEach(req => {
        if (req.viewOptions.show && !selectedCategoriesIds.includes(req.categoryId)) {
          req.viewOptions.show = false;
        }
      });
    }

    return array;
  }

  setShowViewOptionInReqs(array: CMRequirement[], show = true): CMRequirement[] {
    array.forEach(req => {
      req.viewOptions.show = show;
    });

    return array;
  }

  /**
   * Formats the list of {@link CMAttribute}.
   * This is done by recursively prefixing the name of each element to highlight the hierarchy structure of each element.
   * @param {CMAttribute} categories The list of categories
   * @param {string} prefixName The prefix name used to prefix the name of every category
   * @param {string} separatingSymbol The separating symbol used between two linked element (e.g parent.name > child.name).
   */
  formatCategoryListForView(categories: CMAttribute[], prefixName: string, separatingSymbol: string): CMAttribute[] {
    const newArray: CMAttribute[] = [];
    categories.forEach(category => {
      const catCopy: CMAttribute = Object.assign({}, category);
      catCopy.name = prefixName + catCopy.name;
      let children: CMAttribute[] = [];
      if (catCopy.children !== undefined && catCopy.children.length > 0) {
        if (category.children !== undefined) {
          children = this.formatCategoryListForView(
            this.sortArrayByPredicate(category.children, 'showOrder'),
            `${catCopy.name} ${separatingSymbol} `,
            separatingSymbol
          );
        }
        delete catCopy.children;
      }
      newArray.push(catCopy);
      /* retains the order parent before children */
      children.forEach(subCat => {
        newArray.push(subCat);
      });
    });

    return newArray;
  }

  /**
   * Sorts the array according to a given predicate. This should predicate should be an object key from {@link T}
   * @param array The array to by sorted
   * @param predicate The sorting predicate. It should be an object property.
   */
  sortArrayByPredicate<T>(array: T[], predicate: string): T[] {
    if (array === undefined) {
      return array;
    }
    return this.jhiOrderByPipe.transform(array, predicate);
  }

  /**
   * Converts a comma separated string of numbers to an array of numbers.
   * @param value The comma separated string value
   * @param strict Determine to throw an exception for non convertible string values to number
   */
  convertStringToNumberArray(value: string, strict = false): number[] {
    const result: number[] = value.split(',').map(item => {
      const i = Number(item);
      if (!i) {
        if (strict) {
          throw new DOMException('Error converting string value to number.', DOMException.INVALID_CHARACTER_ERR.toString());
        } else {
          // default to '0' if string is non convertible.
          return 0;
        }
      }
      return i;
    });

    // removes duplicates
    return result.filter((i, index, self) => self.indexOf(i) === index);
  }
}
