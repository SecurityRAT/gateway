import { Component, OnDestroy } from '@angular/core';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { Subscription } from 'rxjs';
import { ALERTCSSOFFSET, ALERTCSSTOP } from '../';

@Component({
  selector: 'jhi-alert-error',
  template: `
    <div class="alerts" role="alert">
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
    </div>
  `
})
export class JhiAlertErrorComponent implements OnDestroy {
  alerts: any[];
  cleanHttpErrorListener: Subscription;
  defaultTop: number;
  offset: number;

  /* tslint:disable */
  constructor(private alertService: JhiAlertService, private eventManager: JhiEventManager) {
    this.alerts = [];
    this.offset = ALERTCSSOFFSET;
    this.defaultTop = ALERTCSSTOP;

    this.cleanHttpErrorListener = eventManager.subscribe('gatewayApp.httpError', response => {
      let i;
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
            for (i = 0; i < fieldErrors.length; i++) {
              const fieldError = fieldErrors[i];
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

  setClasses(alert) {
    return {
      'jhi-toast': alert.toast,
      [alert.position]: true
    };
  }

  ngOnDestroy() {
    if (this.cleanHttpErrorListener !== undefined && this.cleanHttpErrorListener !== null) {
      this.eventManager.destroy(this.cleanHttpErrorListener);
      this.alerts = [];
    }
  }
  /* tslint:disable-next-line:no-unused-variable */
  addErrorAlert(message) {
    this.alerts.push(
      this.alertService.addAlert(
        {
          type: 'danger',
          msg: message,
          timeout: 5000,
          toast: this.alertService.isToast(),
          scoped: true,
          position: 'top right'
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
}
