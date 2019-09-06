/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { ExtensionDetailComponent } from 'app/entities/requirementManagement/extension/extension-detail.component';
import { Extension } from 'app/shared/model/requirementManagement/extension.model';

describe('Component Tests', () => {
  describe('Extension Management Detail Component', () => {
    let comp: ExtensionDetailComponent;
    let fixture: ComponentFixture<ExtensionDetailComponent>;
    const route = ({ data: of({ extension: new Extension(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ExtensionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ExtensionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ExtensionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.extension).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
