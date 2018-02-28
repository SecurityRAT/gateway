/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { GatewayTestModule } from '../../../test.module';
import { SkeletonComponent } from '../../../../../../main/webapp/app/entities/skeleton/skeleton.component';
import { SkeletonService } from '../../../../../../main/webapp/app/entities/skeleton/skeleton.service';
import { Skeleton } from '../../../../../../main/webapp/app/entities/skeleton/skeleton.model';

describe('Component Tests', () => {

    describe('Skeleton Management Component', () => {
        let comp: SkeletonComponent;
        let fixture: ComponentFixture<SkeletonComponent>;
        let service: SkeletonService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [SkeletonComponent],
                providers: [
                    SkeletonService
                ]
            })
            .overrideTemplate(SkeletonComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SkeletonComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SkeletonService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Skeleton(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.skeletons[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
