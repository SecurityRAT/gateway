/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { RequirementSetUpdateComponent } from 'app/entities/requirementManagement/requirement-set/requirement-set-update.component';
import { RequirementSetService } from 'app/entities/requirementManagement/requirement-set/requirement-set.service';
import { RequirementSet } from 'app/shared/model/requirementManagement/requirement-set.model';

describe('Component Tests', () => {
  describe('RequirementSet Management Update Component', () => {
    let comp: RequirementSetUpdateComponent;
    let fixture: ComponentFixture<RequirementSetUpdateComponent>;
    let service: RequirementSetService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [RequirementSetUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(RequirementSetUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RequirementSetUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RequirementSetService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new RequirementSet(123);
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
        const entity = new RequirementSet();
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
