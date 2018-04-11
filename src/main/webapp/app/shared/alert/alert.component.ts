import { Component, OnDestroy, OnInit } from '@angular/core';
import { JhiAlertService } from 'ng-jhipster';
import { ALERTCSSTOP, ALERTCSSOFFSET } from '../';

@Component({
    selector: 'jhi-alert',
    template: `
        <div class="alerts" role="alert">
            <div *ngFor="let alert of alerts" class="{{alert.position}}" [ngStyle]="{'top.px': alert.cssTop}" [ngClass]="{\'toast\': alert.toast}">
                <ngb-alert *ngIf="alert && alert.type && alert.msg" [type]="alert.type" (close)="alert.close(alerts)">
                    <p [innerHTML]="alert.msg"></p>
                </ngb-alert>
            </div>
        </div>`
})
export class JhiAlertComponent implements OnInit, OnDestroy {
    alerts: any[];
    offset: number;
    defaultTop: number;
    constructor(private alertService: JhiAlertService) {
        this.offset = ALERTCSSOFFSET;
        this.defaultTop = ALERTCSSTOP;
    }

    ngOnInit() {
        this.alerts = this.alertService.get();
        for (let i = 0; i < this.alerts.length; i++) {
            const alert = this.alerts[i];
            const val = (this.alerts.length - i);
            alert.cssTop = (this.defaultTop * val) + (val * this.offset);
            // if necessary increase the close timeout
        }
    }

    ngOnDestroy() {
        this.alerts = [];
    }

}
