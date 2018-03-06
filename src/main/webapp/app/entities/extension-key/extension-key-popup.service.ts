import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { ExtensionKey } from './extension-key.model';
import { ExtensionKeyService } from './extension-key.service';

@Injectable()
export class ExtensionKeyPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private extensionKeyService: ExtensionKeyService

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
                this.extensionKeyService.find(id)
                    .subscribe((extensionKeyResponse: HttpResponse<ExtensionKey>) => {
                        const extensionKey: ExtensionKey = extensionKeyResponse.body;
                        this.ngbModalRef = this.extensionKeyModalRef(component, extensionKey);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.extensionKeyModalRef(component, new ExtensionKey());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    extensionKeyModalRef(component: Component, extensionKey: ExtensionKey): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.extensionKey = extensionKey;
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
