import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { JhiAlertService } from 'ng-jhipster';
import {
    CaseManagementBackendService,
    RequirementSet
} from '../../shared';

@Component({
    selector: 'jhi-start-up',
    templateUrl: 'start-up.component.html'
})
export class StartUpComponent implements OnInit {

    name: String;
    requirementSets: RequirementSet[];

    constructor(
        private caseManagementBackendService: CaseManagementBackendService,
        private jhiAlertService: JhiAlertService
    ) { }

    ngOnInit() {
        this.caseManagementBackendService.getRequirements().subscribe((res: HttpResponse<RequirementSet[]>) => {
            this.requirementSets = res.body;
            console.log('requirementSet', this.requirementSets);
        }, (res: HttpErrorResponse) => this.onError(res));
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
