import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ExtensionKeyService } from 'app/entities/requirementManagement/extension-key/extension-key.service';
import { IExtensionKey, ExtensionKey } from 'app/shared/model/requirementManagement/extension-key.model';
import { ExtensionSection } from 'app/shared/model/enumerations/extension-section.model';
import { ExtensionType } from 'app/shared/model/enumerations/extension-type.model';

describe('Service Tests', () => {
  describe('ExtensionKey Service', () => {
    let injector: TestBed;
    let service: ExtensionKeyService;
    let httpMock: HttpTestingController;
    let elemDefault: IExtensionKey;
    let expectedResult: IExtensionKey | IExtensionKey[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(ExtensionKeyService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new ExtensionKey(0, 'AAAAAAA', 'AAAAAAA', ExtensionSection.STATUS, ExtensionType.ENUM, 0, false);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a ExtensionKey', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new ExtensionKey()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a ExtensionKey', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            description: 'BBBBBB',
            section: 'BBBBBB',
            type: 'BBBBBB',
            showOrder: 1,
            active: true,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of ExtensionKey', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            description: 'BBBBBB',
            section: 'BBBBBB',
            type: 'BBBBBB',
            showOrder: 1,
            active: true,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a ExtensionKey', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
