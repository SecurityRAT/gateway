import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { GatewayTestModule } from '../../../../test.module';
import { SkeletonDetailComponent } from 'app/entities/requirementManagement/skeleton/skeleton-detail.component';
import { Skeleton } from 'app/shared/model/requirementManagement/skeleton.model';

describe('Component Tests', () => {
  describe('Skeleton Management Detail Component', () => {
    let comp: SkeletonDetailComponent;
    let fixture: ComponentFixture<SkeletonDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ skeleton: new Skeleton(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [SkeletonDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(SkeletonDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SkeletonDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load skeleton on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.skeleton).toEqual(jasmine.objectContaining({ id: 123 }));
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
