/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpResponse } from '@angular/common/http';

import { SERVER_API_URL } from '../../../../../../../main/webapp/app/app.constants';
import { CaseManagementBackendService } from '../../../../../../../main/webapp/app/case-management/common/services/case-management-backend.service';
import { CMAttributeType } from '../../../../../../../main/webapp/app/case-management/common/models/attribute-key.model';

describe('Service Tests', () => {

    describe('CaseManagementBackendService Test', () => {
        let injector: TestBed;
        let service: CaseManagementBackendService;
        let httpMock: HttpTestingController;

        const resourceUrl = SERVER_API_URL + 'caseManagement/api';

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [
                    HttpClientTestingModule
                ],
                providers: [
                    CaseManagementBackendService
                ]
            });
            injector = getTestBed();
            service = injector.get(CaseManagementBackendService);
            httpMock = injector.get(HttpTestingController);
        });

        describe('Calls all URLs in this service', () => {

            it('should call correct URL caseManagement/api/attributes', () => {
                service.getAttributes(123, CMAttributeType.FETAG).subscribe(() => { });
                const req = httpMock.expectOne({ method: 'GET' });
                expect(req.request.url).toEqual(resourceUrl + '/attributes');
            });

            it('should call correct URL caseManagement/api/requirementSets', () => {
                service.getRequirementSets().subscribe(() => { });
                const req = httpMock.expectOne({ method: 'GET' });
                expect(req.request.url).toEqual(resourceUrl + '/requirementSets');
            });

            it('should call correct URL caseManagement/api/attributeKeys', () => {
                service.getAttributeKeys(123, CMAttributeType.FETAG).subscribe(() => { });
                const req = httpMock.expectOne({ method: 'GET' });
                expect(req.request.url).toEqual(resourceUrl + '/attributeKeys');
            });
        });

        describe('checks returns of methods in this service', () => {

            it('should return CMAttributeKey[]', () => {
                service.getAttributeKeys(123, CMAttributeType.FETAG).
                    subscribe((received) => {
                        expect(received.body[0].id).toEqual(123);
                    });
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush([{ id: 123, name: 'test', description: 'testDescription', type: 'FE_TAG', showOrder: 10 }]);
            });

            it('should return RequirementSetResponseType', () => {
                service.getRequirementSets().subscribe((received) => {
                    expect(received.body[0].id).toEqual(123);
                });
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush([{ id: 123, name: 'test', showOrder: 10, description: 'testDescription' }]);
            });

            it('should return CMAAttributeType', () => {
                service.getAttributes(123, CMAttributeType.FETAG).subscribe((received) => {
                    expect(received.body[0].id).toEqual(123);
                });
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush([{
                    id: 123, name: 'test', showOrder: 10, keyId: 1,
                    description: 'testDescription', children: null, selected: true
                }]);
            });

            it('should return Array', () => {
                     const mockResponseData = [
                        { id: 111, name: 'test1', showOrder: 10, description: 'testDescription1' },
                        { id: 222, name: 'test2', showOrder: 20, description: 'testDescription2' }
                    ];

                    const response = new HttpResponse({body: mockResponseData});
                   expect(service.convertResponseArrayToType(response).body[1].description).toEqual('testDescription2');
                 });
        });

        describe('trigger not found response for methods with Http-call', () => {

            it('should propagate not found response for getAttributeKeys', () => {
                service.getAttributeKeys(123, CMAttributeType.FETAG).subscribe(null, (_error: any) => {
                    expect(_error.status).toEqual(404);
                });
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush('Invalid request parameters', {
                    status: 404, statusText: 'Bad Request'
                });
            });

            it('should propagate not found response for getRequirementSets', () => {
                service.getRequirementSets().subscribe(null, (_error: any) => {
                    expect(_error.status).toEqual(404);
                });

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush('Invalid request parameters', {
                    status: 404, statusText: 'Bad Request'
                });
            });

            it('should propagate not found response for getAttributes', () => {
                service.getAttributes(123, CMAttributeType.FETAG).subscribe(null, (_error: any) => {
                    expect(_error.status).toEqual(404);
                });

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush('Invalid request parameters', {
                    status: 404, statusText: 'Bad Request'
                });
            });

        });
        afterEach(() => {
            httpMock.verify();
        });
    });
});
