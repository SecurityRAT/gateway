import { TestBed, inject } from '@angular/core/testing';
import { JhiFilterPipe, JhiOrderByPipe } from 'ng-jhipster';

import { CMUtilService } from '../../../../../../../main/webapp/app/case-management/common/services/util.service';

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

        const filteredArray = service.filterAttributesByObj(givenArray, { selected: true });

        expect(filteredArray.length).toBe(1);
        expect(filteredArray[0].id).toBe(1);
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

        const filteredArray = service.filterAttributesByObj(givenArray, { selected: true });

        expect(filteredArray.length).toBe(2);
        expect(filteredArray.map((item) => item.id).indexOf(1) !== -1).toBeTruthy();
        expect(filteredArray.map((item) => item.id).indexOf(3) !== -1).toBeTruthy();
      });

      it('should filter out by id element with nested array', () => {
        const givenArray: any[] = [
          {
            id: 1,
            selected: true,
            name: 'test',
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

        const filteredArray = service.filterAttributesByObj(givenArray, { id: 1 });

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
    });
  });
});
