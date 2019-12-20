import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { SkAtExDetailComponent } from 'app/entities/requirementManagement/sk-at-ex/sk-at-ex-detail.component';
import { SkAtEx } from 'app/shared/model/requirementManagement/sk-at-ex.model';

describe('Component Tests', () => {
  describe('SkAtEx Management Detail Component', () => {
    let comp: SkAtExDetailComponent;
    let fixture: ComponentFixture<SkAtExDetailComponent>;
    const route = ({ data: of({ skAtEx: new SkAtEx(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [SkAtExDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(SkAtExDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SkAtExDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.skAtEx).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
