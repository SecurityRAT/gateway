import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { AttributeKey } from './attribute-key.model';
import { AttributeKeyService } from './attribute-key.service';

@Injectable()
export class AttributeKeyPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private attributeKeyService: AttributeKeyService

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
                this.attributeKeyService.find(id)
                    .subscribe((attributeKeyResponse: HttpResponse<AttributeKey>) => {
                        const attributeKey: AttributeKey = attributeKeyResponse.body;
                        this.ngbModalRef = this.attributeKeyModalRef(component, attributeKey);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.attributeKeyModalRef(component, new AttributeKey());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    attributeKeyModalRef(component: Component, attributeKey: AttributeKey): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.attributeKey = attributeKey;
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
