/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { GatewayTestModule } from '../../../test.module';
import { SkeletonDetailComponent } from '../../../../../../main/webapp/app/entities/skeleton/skeleton-detail.component';
import { SkeletonService } from '../../../../../../main/webapp/app/entities/skeleton/skeleton.service';
import { Skeleton } from '../../../../../../main/webapp/app/entities/skeleton/skeleton.model';

describe('Component Tests', () => {

    describe('Skeleton Management Detail Component', () => {
        let comp: SkeletonDetailComponent;
        let fixture: ComponentFixture<SkeletonDetailComponent>;
        let service: SkeletonService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [SkeletonDetailComponent],
                providers: [
                    SkeletonService
                ]
            })
            .overrideTemplate(SkeletonDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SkeletonDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SkeletonService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Skeleton(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.skeleton).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
