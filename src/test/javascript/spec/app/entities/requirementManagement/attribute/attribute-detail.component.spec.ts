/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { AttributeDetailComponent } from 'app/entities/requirementManagement/attribute/attribute-detail.component';
import { Attribute } from 'app/shared/model/requirementManagement/attribute.model';

describe('Component Tests', () => {
  describe('Attribute Management Detail Component', () => {
    let comp: AttributeDetailComponent;
    let fixture: ComponentFixture<AttributeDetailComponent>;
    const route = ({ data: of({ attribute: new Attribute(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [AttributeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(AttributeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AttributeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.attribute).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
