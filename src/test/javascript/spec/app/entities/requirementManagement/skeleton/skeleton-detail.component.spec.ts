/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { SkeletonDetailComponent } from 'app/entities/requirementManagement/skeleton/skeleton-detail.component';
import { Skeleton } from 'app/shared/model/requirementManagement/skeleton.model';

describe('Component Tests', () => {
  describe('Skeleton Management Detail Component', () => {
    let comp: SkeletonDetailComponent;
    let fixture: ComponentFixture<SkeletonDetailComponent>;
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
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.skeleton).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
