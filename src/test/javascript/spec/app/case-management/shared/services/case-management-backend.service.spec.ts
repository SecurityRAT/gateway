/* tslint:disable max-line-length */
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { HttpResponse } from '@angular/common/http';

import { CaseManagementBackendService } from 'app/case-management/common/services/case-management-backend.service';
import { SERVER_API_URL } from 'app/app.constants';
import { CMAttributeType, CMAttributeKey } from 'app/case-management/common/models/attribute-key.model';
import {
  CMAttribute,
  ATTRIBUTES_URI,
  ATTRIBUTEKEYS_URI,
  CMRequirementSet,
  REQUIREMENTSETS_URI,
  ENHANCEMENTS_URI
} from 'app/case-management/common';
import { HttpResponse } from '@angular/common/http';

describe('Service Tests', () => {
  describe('CaseManagementBackendService Test', () => {
    let service: CaseManagementBackendService;
    let httpMock: HttpTestingController;

    const resourceUrl = SERVER_API_URL + 'services/casemanagement/api';

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [CaseManagementBackendService]
      });
      service = TestBed.get(CaseManagementBackendService);
      httpMock = TestBed.get(HttpTestingController);
    });

    describe('Calls all URLs in this service', () => {
      it('should call correct URL caseManagement/api/attributes', () => {
        service.query(CMAttribute, ATTRIBUTES_URI).subscribe(() => {});
        const req = httpMock.expectOne({ method: 'GET' });
        expect(req.request.url).toEqual(resourceUrl + '/attributes');
      });

      // it('should call correct URL caseManagement/api/requirementSets', () => {
      //     service.getRequirementSets().subscribe(() => { });
      //     const req = httpMock.expectOne({ method: 'GET' });
      //     expect(req.request.url).toEqual(resourceUrl + '/requirementSets');
      // });

      // it('should call correct URL caseManagement/api/attributeKeys', () => {
      //     service.findAttributeKeys(123, CMAttributeType.FETAG).subscribe(() => { });
      //     const req = httpMock.expectOne({ method: 'GET' });
      //     expect(req.request.url).toEqual(resourceUrl + '/attributeKeys');
      // });
    });

    describe('checks returns of methods in this service', () => {
      it('should return CMAttributeKey[]', () => {
        service
          .query(CMAttributeKey, ATTRIBUTEKEYS_URI, { requirementSet: 123, type: CMAttributeType.PARAMETER })
          .subscribe((res: HttpResponse<CMAttributeKey[]>) => {
            expect(res.body[0].id).toEqual(123);
          });
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([{ id: 123, name: 'test', description: 'testDescription', type: 'FE_TAG', showOrder: 10 }]);
      });

      it('should return RequirementSet', () => {
        service.query(CMRequirementSet, REQUIREMENTSETS_URI).subscribe(received => {
          expect(received.body[0].id).toEqual(123);
        });
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([{ id: 123, name: 'test', showOrder: 10, description: 'testDescription' }]);
      });
    });

    describe('trigger not found response for methods with Http-call', () => {
      it('should propagate not found response for getAttributeKeys', () => {
        service
          .query(CMAttributeKey, ATTRIBUTEKEYS_URI, { requirementSet: 123, type: CMAttributeType.FETAG })
          .subscribe(null, (_error: any) => {
            expect(_error.status).toEqual(404);
          });
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush('Invalid request parameters', {
          status: 404,
          statusText: 'Bad Request'
        });
      });

      it('should propagate not found response for enhancements', () => {
        service.query(CMAttributeKey, ENHANCEMENTS_URI, { requirementSet: 1 }).subscribe(null, (_error: any) => {
          expect(_error.status).toEqual(404);
        });

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush('Invalid request parameters', {
          status: 404,
          statusText: 'Bad Request'
        });
      });
    });
    afterEach(() => {
      httpMock.verify();
    });
  });
});
