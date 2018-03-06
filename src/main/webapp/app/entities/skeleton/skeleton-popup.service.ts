import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { Skeleton } from './skeleton.model';
import { SkeletonService } from './skeleton.service';

@Injectable()
export class SkeletonPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private skeletonService: SkeletonService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        /* tslint:disable-next-line:no-unused-variable*/
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.skeletonService.find(id)
                    .subscribe((skeletonResponse: HttpResponse<Skeleton>) => {
                        const skeleton: Skeleton = skeletonResponse.body;
                        this.ngbModalRef = this.skeletonModalRef(component, skeleton);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.skeletonModalRef(component, new Skeleton());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    skeletonModalRef(component: Component, skeleton: Skeleton): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.skeleton = skeleton;
        /* tslint:disable-next-line:no-unused-variable*/
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        /* tslint:disable-next-line:no-unused-variable*/
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
