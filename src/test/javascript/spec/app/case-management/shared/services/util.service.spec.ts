import { TestBed, inject } from '@angular/core/testing';
import { JhiFilterPipe, JhiOrderByPipe } from 'ng-jhipster';

import { CMUtilService } from '../../../../../../../main/webapp/app/case-management/common/services/util.service';
import { CMRequirement, CMAttribute } from '../../../../../../../main/webapp/app/case-management/common';

describe('Service Tests', () => {
  describe('CM Util Service', () => {

    let service: CMUtilService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          CMUtilService,
          JhiFilterPipe,
          JhiOrderByPipe
        ]
      });

      service = TestBed.get(CMUtilService);
    });

    it('should be created', inject([CMUtilService], (testService: CMUtilService) => {
      expect(testService).toBeTruthy();
    }));

    describe('Service methods', () => {
      it('should filter out selected element in array', () => {
        const givenArray: CMAttribute[] = [
          {
            id: 1,
            selected: true,
            name: 'test1',
            showOrder: 1
          },
          {
            id: 2,
            name: 'test2',
            selected: false,
            showOrder: 1,
            children: []
          },
          {
            id: 2,
            name: 'test3',
            showOrder: 1
          }
        ];

        const filteredArray = service.filterByObj(givenArray, { selected: true });

        expect(filteredArray.length).toBe(1);
        expect(filteredArray[0].id).toBe(1);
        expect(givenArray[1].children).toBeDefined();
      });
      it('should filter out selected element with nested array', () => {
        const givenArray: any[] = [
          {
            id: 1,
            selected: true,
            children: [
              {
                id: 3,
                selected: true
              }
            ]
          },
          {
            id: 2,
            selected: false
          },
          {
            id: 4
          }
        ];

        const filteredArray = service.filterByObj(givenArray, { selected: true });

        expect(filteredArray.length).toBe(2);
        expect(filteredArray[0].children).toBeUndefined();
        expect(filteredArray[1].children).toBeUndefined();
        expect(filteredArray.map((item) => item.id).indexOf(1) !== -1).toBeTruthy();
        expect(filteredArray.map((item) => item.id).indexOf(3) !== -1).toBeTruthy();
      });

      it('should filter out by id element without nested array', () => {
        const givenArray: any[] = [
          {
            id: 1,
            selected: true,
            name: 'test'
          },
          {
            id: 2,
            selected: false
          },
          {
            id: 4
          }
        ];

        const filteredArray = service.filterByObj(givenArray, { id: 1 });

        expect(filteredArray.length).toBe(1);
        expect(filteredArray[0].name).toEqual('test');
      });

      it('should sort by #showOrder property', () => {
        const givenArray: any[] = [
          {
            id: 1,
            showOrder: 10
          },
          {
            id: 2,
            showOrder: 30
          },
          {
            id: 3,
            showOrder: 20
          }
        ];

        const filteredArray = service.sortArrayByPredicate(givenArray, 'showOrder');
        expect(filteredArray[0].id).toBe(1);
        expect(filteredArray[1].id).toBe(3);
        expect(filteredArray[2].id).toBe(2);
      });

      it('should convert comma seperated string into an array of numbers', () => {
        const testValue = '1,2,23';

        const filteredArray = service.convertStringToNumberArray(testValue);
        expect(filteredArray[0]).toBe(1);
        expect(filteredArray[1]).toBe(2);
        expect(filteredArray[2]).toBe(23);
      });

      it('error should be thrown due to non convertible number', () => {
        const testValue = '1,2,23a';

        try {
          service.convertStringToNumberArray(testValue);
        } catch (e) {
          const error = <DOMException>e;
          expect(error.name).toEqual(DOMException.INVALID_CHARACTER_ERR.toString());
          expect(error.message).toContain('Error converting string');
        }
      });

      it('should format the list by prefixing the name of each element', () => {
        const givenArray: any[] = [
          {
            id: 1,
            showOrder: 10,
            name: 'category 1',
            children: [
              {
                id: 4,
                showOrder: 20,
                name: 'category 1 child',
              },
              {
                id: 5,
                showOrder: 10,
                name: 'category 2 child',
              },
            ]
          },
          {
            id: 2,
            showOrder: 30,
            name: 'category 2',
          },
          {
            id: 3,
            showOrder: 20,
            name: 'category 3',
          }
        ];

        const formatedArray = service.formatCategoryListForView(givenArray, '', '>');
        expect(formatedArray.length).toBe(5);
        expect(formatedArray[0].id).toBe(1);
        expect(formatedArray[0].name).toEqual('category 1');
        expect(formatedArray[1].name).toEqual('category 1 > category 2 child');
        expect(formatedArray[2].name).toEqual('category 1 > category 1 child');
      });

      it('should filter by category id', () => {
        const givenArray: CMRequirement[] = [
          new CMRequirement(1, 'test1', 1, 10, [], [], [], []),
          new CMRequirement(2, 'test2', 2, 20, [], [], [], []),
          new CMRequirement(3, 'test3', 3, 30, [], [], [], []),
          new CMRequirement(4, 'test4', 4, 40, [], [], [], []),
        ];

        service.filterRequirementsByCategories(givenArray, [1, 3]);
        expect(givenArray[0].viewOptions.show).toBeTruthy();
        expect(givenArray[1].viewOptions.show).toBeFalsy();
        expect(givenArray[2].viewOptions.show).toBeTruthy();
        expect(givenArray[3].viewOptions.show).toBeFalsy();

        /* No change in the second element because it's show property is already falsy. */
        service.filterRequirementsByCategories(givenArray, [2]);
        expect(givenArray[0].viewOptions.show).toBeFalsy();
        expect(givenArray[1].viewOptions.show).toBeFalsy();
        expect(givenArray[2].viewOptions.show).toBeFalsy();
        expect(givenArray[3].viewOptions.show).toBeFalsy();
      });

      it('should filter by tags', () => {
        const givenArray: CMRequirement[] = [
          new CMRequirement(1, 'test1', 1, 10, [1, 2, 3], [], [], []),
          new CMRequirement(2, 'test2', 2, 20, [3, 4, 5, 1], [], [], []),
          new CMRequirement(3, 'test3', 3, 30, [2, 6, 7, 8, 1], [], [], []),
          new CMRequirement(4, 'test4', 4, 40, [10, 11, 12, 3, 1], [], [], []),
        ];

        const selectedtagsObj = {
          '2': [5, 7, 11]
        };
        service.filterRequirementsByFeTags(givenArray, selectedtagsObj);
        expect(givenArray[0].viewOptions.show).toBeFalsy();
        expect(givenArray[1].viewOptions.show).toBeTruthy();
        expect(givenArray[2].viewOptions.show).toBeTruthy();
        expect(givenArray[3].viewOptions.show).toBeTruthy();

        service.setShowViewOptionInReqs(givenArray, true);
        const selectedtagsObj2 = {
          '1': [2, 4],
          '2': [5, 7, 11],
          '3': [8, 1],
        };

        service.filterRequirementsByFeTags(givenArray, selectedtagsObj2);
        expect(givenArray[0].viewOptions.show).toBeFalsy();
        expect(givenArray[1].viewOptions.show).toBeTruthy();
        expect(givenArray[2].viewOptions.show).toBeTruthy();
        expect(givenArray[3].viewOptions.show).toBeFalsy();
      });
      it('combining category and tag filter', () => {
        const givenArray: CMRequirement[] = [
          new CMRequirement(1, 'test1', 1, 10, [1, 2, 3], [], [], []),
          new CMRequirement(2, 'test2', 2, 20, [3, 4, 5, 1], [], [], []),
          new CMRequirement(3, 'test3', 3, 30, [2, 6, 7, 8, 1], [], [], []),
          new CMRequirement(4, 'test4', 4, 40, [10, 11, 12, 3, 1], [], [], []),
        ];

        const selectedtagsObj = {
          '2': [5, 7, 11]
        };
        service.filterRequirementsByCategories(givenArray, [1, 2]);
        service.filterRequirementsByFeTags(givenArray, selectedtagsObj);
        expect(givenArray[0].viewOptions.show).toBeFalsy();
        expect(givenArray[1].viewOptions.show).toBeTruthy();
        expect(givenArray[2].viewOptions.show).toBeFalsy();
        expect(givenArray[3].viewOptions.show).toBeFalsy();
      });
    });
  });
});
