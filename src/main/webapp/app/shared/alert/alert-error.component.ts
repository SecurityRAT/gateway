import { Component, OnDestroy } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { JhiEventManager, JhiAlertService, JhiEventWithContent } from 'ng-jhipster';
import { Subscription } from 'rxjs';
import { ALERTCSSOFFSET, ALERTCSSTOP } from '../';

import { AlertError } from './alert-error.model';

@Component({
  selector: 'jhi-alert-error',
  template: ` <div class="alerts" role="alert">
    <div
      *ngFor="let alert of alerts"
      class="{{ alert.position }}"
      style="z-index: 10000"
      [ngStyle]="{ 'top.px': alert.cssTop }"
      [ngClass]="{ toast: alert.toast }"
    >
      <ngb-alert *ngIf="alert && alert.type && alert.msg" [type]="alert.type" (close)="alert.close(alerts)">
        <ngx-md>{{ alert.msg }}</ngx-md>
      </ngb-alert>
    </div>
  </div>`,
})
export class AlertErrorComponent implements OnDestroy {
  alerts: any[] = [];
  defaultTop: number = ALERTCSSOFFSET;
  offset: number = ALERTCSSTOP;
  errorListener: Subscription;
  httpErrorListener: Subscription;

  constructor(private alertService: JhiAlertService, private eventManager: JhiEventManager) {
    this.errorListener = eventManager.subscribe('gatewayApp.error', (response: JhiEventWithContent<AlertError>) => {
      const errorResponse = response.content;
      this.addErrorAlert(errorResponse.message);
    });

    this.httpErrorListener = eventManager.subscribe('gatewayApp.httpError', (response: JhiEventWithContent<HttpErrorResponse>) => {
      const httpErrorResponse = response.content;
      switch (httpErrorResponse.status) {
        // connection refused, server not reachable
        case 0:
          this.addErrorAlert('Server not reachable');
          break;

        case 400: {
          const arr = httpErrorResponse.headers.keys();
          let errorHeader = null;
          arr.forEach(entry => {
            if (entry.toLowerCase().endsWith('app-error')) {
              errorHeader = httpErrorResponse.headers.get(entry);
            }
          });
          if (errorHeader) {
            this.addErrorAlert(errorHeader);
          } else if (httpErrorResponse.error !== '' && httpErrorResponse.error.fieldErrors) {
            const fieldErrors = httpErrorResponse.error.fieldErrors;
            for (const fieldError of fieldErrors) {
              if (['Min', 'Max', 'DecimalMin', 'DecimalMax'].includes(fieldError.message)) {
                fieldError.message = 'Size';
              }
              // convert 'something[14].other[4].id' to 'something[].other[].id' so translations can be written to it
              const convertedField = fieldError.field.replace(/\[\d*\]/g, '[]');
              const fieldName = convertedField.charAt(0).toUpperCase() + convertedField.slice(1);
              this.addErrorAlert('Error on field "' + fieldName + '"');
            }
          } else if (httpErrorResponse.error !== '' && httpErrorResponse.error.message) {
            this.addErrorAlert(httpErrorResponse.error.message);
          } else {
            // this.addErrorAlert(httpErrorResponse.error);
            this.addErrorAlert('The request could not be understood by the server due to malformed syntax.');
          }
          break;
        }

        case 404:
          this.addErrorAlert('The resource you requested was not found. Please provide a valid one.');
          break;
        case 500:
          this.addErrorAlert('The server encountered an unexpected condition which prevented it from fulfilling the request.');
          break;
        default:
          if (httpErrorResponse.error !== '' && httpErrorResponse.error.message) {
            this.addErrorAlert(httpErrorResponse.error.message);
          } else {
            this.addErrorAlert(httpErrorResponse.error);
          }
      }
    });
  }

  setClasses(alert: any): { [key: string]: boolean } {
    const classes = { 'jhi-toast': Boolean(alert.toast) };
    if (alert.position) {
      return { ...classes, [alert.position]: true };
    }
    return classes;
  }

  ngOnDestroy(): void {
    if (this.errorListener) {
      this.eventManager.destroy(this.errorListener);
    }
    if (this.httpErrorListener) {
      this.eventManager.destroy(this.httpErrorListener);
    }
  }
  /* tslint:disable-next-line:no-unused-variable */
  addErrorAlert(message: string): void {
    this.alerts.push(
      this.alertService.addAlert(
        {
          type: 'danger',
          msg: message,
          timeout: 5000,
          toast: this.alertService.isToast(),
          scoped: true,
          position: 'top right',
        },
        this.alerts
      )
    );
    for (let i = 0; i < this.alerts.length; i++) {
      const alert = this.alerts[i];
      const val = this.alerts.length - i;
      alert.cssTop = this.defaultTop * val + val * this.offset;
      // if necessary increase the close timeout
    }
  }

  close(alert: any): void {
    // NOSONAR can be removed after https://github.com/SonarSource/SonarJS/issues/1930 is resolved
    alert.close?.(this.alerts); // NOSONAR
  }
}
