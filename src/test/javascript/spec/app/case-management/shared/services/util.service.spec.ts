import { TestBed, inject } from '@angular/core/testing';

import { CMUtilService } from '../../../../../../../main/webapp/app/case-management/shared/services/util.service';

describe('Service Tests', () => {
  describe('CM Util Service', () => {

    let service: CMUtilService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [CMUtilService]
      });

      service = TestBed.get(CMUtilService);
    });

    it('should be created', inject([CMUtilService], (testService: CMUtilService) => {
      expect(testService).toBeTruthy();
    }));

    describe('Service methods', () => {
      it('should filter out selected element in array', () => {
        const givenArray = [
          {
            id: 1,
            selected: true,
          },
          {
            id: 2,
            selected: false,
            children: []
          },
          {
            id: 2
          }
        ];

        const filteredArray = service.filterSelectedItemsInNestedArray(givenArray);

        expect(filteredArray.length).toBe(1);
        expect(filteredArray[0].id).toBe(1);
      });

      it('should sort by #showOrder property', () => {
        const givenArray = [
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

        const filteredArray = service.sortArrayByShowOrder(givenArray);

        expect(filteredArray[0].id).toBe(1);
        expect(filteredArray[1].id).toBe(3);
        expect(filteredArray[2].id).toBe(2);
      });
    });
  });
});
