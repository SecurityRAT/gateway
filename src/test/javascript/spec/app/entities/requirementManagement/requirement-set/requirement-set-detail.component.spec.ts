import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { GatewayTestModule } from '../../../../test.module';
import { RequirementSetDetailComponent } from 'app/entities/requirementManagement/requirement-set/requirement-set-detail.component';
import { RequirementSet } from 'app/shared/model/requirementManagement/requirement-set.model';

describe('Component Tests', () => {
  describe('RequirementSet Management Detail Component', () => {
    let comp: RequirementSetDetailComponent;
    let fixture: ComponentFixture<RequirementSetDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ requirementSet: new RequirementSet(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [RequirementSetDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(RequirementSetDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RequirementSetDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load requirementSet on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.requirementSet).toEqual(jasmine.objectContaining({ id: 123 }));
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
