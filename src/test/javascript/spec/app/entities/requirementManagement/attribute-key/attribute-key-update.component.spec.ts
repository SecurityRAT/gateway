import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { AttributeKeyUpdateComponent } from 'app/entities/requirementManagement/attribute-key/attribute-key-update.component';
import { AttributeKeyService } from 'app/entities/requirementManagement/attribute-key/attribute-key.service';
import { AttributeKey } from 'app/shared/model/requirementManagement/attribute-key.model';

describe('Component Tests', () => {
  describe('AttributeKey Management Update Component', () => {
    let comp: AttributeKeyUpdateComponent;
    let fixture: ComponentFixture<AttributeKeyUpdateComponent>;
    let service: AttributeKeyService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [AttributeKeyUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(AttributeKeyUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AttributeKeyUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AttributeKeyService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new AttributeKey(123);
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
        const entity = new AttributeKey();
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
