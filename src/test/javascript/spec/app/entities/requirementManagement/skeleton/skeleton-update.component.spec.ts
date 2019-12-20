import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { SkeletonUpdateComponent } from 'app/entities/requirementManagement/skeleton/skeleton-update.component';
import { SkeletonService } from 'app/entities/requirementManagement/skeleton/skeleton.service';
import { Skeleton } from 'app/shared/model/requirementManagement/skeleton.model';

describe('Component Tests', () => {
  describe('Skeleton Management Update Component', () => {
    let comp: SkeletonUpdateComponent;
    let fixture: ComponentFixture<SkeletonUpdateComponent>;
    let service: SkeletonService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [SkeletonUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(SkeletonUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SkeletonUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SkeletonService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Skeleton(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Skeleton();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
