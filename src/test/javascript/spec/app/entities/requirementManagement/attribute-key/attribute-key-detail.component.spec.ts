/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { AttributeKeyDetailComponent } from 'app/entities/requirementManagement/attribute-key/attribute-key-detail.component';
import { AttributeKey } from 'app/shared/model/requirementManagement/attribute-key.model';

describe('Component Tests', () => {
  describe('AttributeKey Management Detail Component', () => {
    let comp: AttributeKeyDetailComponent;
    let fixture: ComponentFixture<AttributeKeyDetailComponent>;
    const route = ({ data: of({ attributeKey: new AttributeKey(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [AttributeKeyDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(AttributeKeyDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AttributeKeyDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.attributeKey).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
