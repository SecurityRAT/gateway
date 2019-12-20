import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../../test.module';
import { RequirementSetDeleteDialogComponent } from 'app/entities/requirementManagement/requirement-set/requirement-set-delete-dialog.component';
import { RequirementSetService } from 'app/entities/requirementManagement/requirement-set/requirement-set.service';

describe('Component Tests', () => {
  describe('RequirementSet Management Delete Component', () => {
    let comp: RequirementSetDeleteDialogComponent;
    let fixture: ComponentFixture<RequirementSetDeleteDialogComponent>;
    let service: RequirementSetService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [RequirementSetDeleteDialogComponent]
      })
        .overrideTemplate(RequirementSetDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RequirementSetDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RequirementSetService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
