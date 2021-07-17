import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { GatewayTestModule } from '../../../../test.module';
import { ExtensionDetailComponent } from 'app/entities/requirementManagement/extension/extension-detail.component';
import { Extension } from 'app/shared/model/requirementManagement/extension.model';

describe('Component Tests', () => {
  describe('Extension Management Detail Component', () => {
    let comp: ExtensionDetailComponent;
    let fixture: ComponentFixture<ExtensionDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ extension: new Extension(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ExtensionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ExtensionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ExtensionDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load extension on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.extension).toEqual(jasmine.objectContaining({ id: 123 }));
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
