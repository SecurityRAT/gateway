/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { RequirementSetDetailComponent } from 'app/entities/requirementManagement/requirement-set/requirement-set-detail.component';
import { RequirementSet } from 'app/shared/model/requirementManagement/requirement-set.model';

describe('Component Tests', () => {
  describe('RequirementSet Management Detail Component', () => {
    let comp: RequirementSetDetailComponent;
    let fixture: ComponentFixture<RequirementSetDetailComponent>;
    const route = ({ data: of({ requirementSet: new RequirementSet(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [RequirementSetDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(RequirementSetDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RequirementSetDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.requirementSet).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
