import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { GatewayTestModule } from '../../../../test.module';
import { AttributeKeyDetailComponent } from 'app/entities/requirementManagement/attribute-key/attribute-key-detail.component';
import { AttributeKey } from 'app/shared/model/requirementManagement/attribute-key.model';

describe('Component Tests', () => {
  describe('AttributeKey Management Detail Component', () => {
    let comp: AttributeKeyDetailComponent;
    let fixture: ComponentFixture<AttributeKeyDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ attributeKey: new AttributeKey(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [AttributeKeyDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(AttributeKeyDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AttributeKeyDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load attributeKey on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.attributeKey).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });

    describe('byteSize', () => {
      it('Should call byteSize from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'byteSize');
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.byteSize(fakeBase64);

        // THEN
        expect(dataUtils.byteSize).toBeCalledWith(fakeBase64);
      });
    });

    describe('openFile', () => {
      it('Should call openFile from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'openFile');
        const fakeContentType = 'fake content type';
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.openFile(fakeContentType, fakeBase64);

        // THEN
        expect(dataUtils.openFile).toBeCalledWith(fakeContentType, fakeBase64);
      });
    });
  });
});
