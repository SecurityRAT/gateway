import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { JhiAlertService } from 'ng-jhipster';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import {
    CaseManagementBackendService,
    CMUtilService,
    CMRequirementSet,
    CMAttributeKey,
    CMAttribute,
    CMAttributeType,
    ARTIFACT_SETTINGS_OBS
} from '../../shared';
import { Router } from '@angular/router';

@Component({
    selector: 'jhi-start-up',
    templateUrl: 'start-up.component.html',
    styleUrls: [
        'start-up.css'
    ]
})
export class StartUpComponent implements OnInit {

    artifactSettings: any;
    selectedRequirementSet: CMRequirementSet;
    backUpSelectedRequirementSetId: number; // In case the tab is switch back and forth but the requirement set is not changed.
    requirementSets: CMRequirementSet[];
    attributeKeys: CMAttributeKey[];
    attributes: CMAttribute[];
    tabs: any[];
    initialActiveTab: String;

    constructor(
        private caseManagementBackendService: CaseManagementBackendService,
        private jhiAlertService: JhiAlertService,
        private util: CMUtilService,
        private router: Router
    ) {
        this.artifactSettings = Object.create(null);
        this.selectedRequirementSet = null;
        this.requirementSets = [];
        this.attributeKeys = [];
        this.attributes = [];
        this.tabs = [
            {
                title: 'Select a requirement set',
                id: 'step1'
            },
            {
                title: 'Artifact settings',
                id: 'step2'
            }
        ];
    }

    ngOnInit() {
        // this.route.queryParamMap.subscribe((params: Params) => {
        //     this.queryParams = params;
        // });

        // Loads the requirements sets
        this.caseManagementBackendService.getRequirementSets().subscribe((res: HttpResponse<CMRequirementSet[]>) => {
            this.onSuccess(res.body, this.requirementSets);
            // TODO Implement change settings. The selected Ids should be available in the queryParms variable.
            // TODO Implement reaction to cases where the Ids from the queryParams do not exist in the received values from the server.
            if (res.body.length === 1) {
                this.selectedRequirementSet = res.body[0];
                this.loadAll();
                this.setInitialActiveTab(1); // the initial tab to the second one.
            }
        }, (res: HttpErrorResponse) => this.onError(res));

    }

    // registerEvent() {
    //     this.artifactSettingsEvent = this.jhiEventManager.subscribe('artifactSettingModification', () => { });
    // }

    loadAll() {
        // this.onSuccess(this.caseManagementBackendService.getMockAttributeKeys(), this.attributeKeys);
        // this.onSuccess(this.caseManagementBackendService.getMockAttributes(), this.attributes);

        this.caseManagementBackendService.getAttributeKeys(this.selectedRequirementSet.id, CMAttributeType.PARAMETER).subscribe((res: HttpResponse<CMAttribute[]>) => {
            this.onSuccess(res.body, this.attributeKeys);
        });
        this.caseManagementBackendService.getAttributes(this.selectedRequirementSet.id, CMAttributeType.PARAMETER).subscribe((res: HttpResponse<CMAttribute[]>) => {
            this.onSuccess(res.body, this.attributes);
        });
    }
    /**
     * Bounds to the ngTab 'tabchange' event.
     * @param $event event object
     */
    beforeChange($event: NgbTabChangeEvent) {
        switch ($event.nextId) {
            case this.tabs[1].id:
                if (this.selectedRequirementSet && this.selectedRequirementSet.id !== this.backUpSelectedRequirementSetId) {
                    this.reset();
                }
                break;
            default:
                this.backUpSelectedRequirementSetId = this.selectedRequirementSet.id;
                break;
        }
    }

    generate() {
        const selectedAttributes: CMAttribute[] = this.util.filterSelectedItemsInNestedArray(this.attributes);
        this.router.navigate(['/requirements',
            {
                requirementSet: this.selectedRequirementSet.id,
                attributes: selectedAttributes.map((item) => item.id),
                attributeKeys: selectedAttributes.map((item) => item.keyId).filter((elem, index, self) => {
                    return index === self.indexOf(elem);
                }),
                name: this.artifactSettings.name
            }]);
    }

    private reset() {
        this.attributeKeys = [];
        this.attributes = [];
        this.loadAll();
    }

    /**
     * Determines the value of the initial Active tab.
     */
    private setInitialActiveTab(tabIndex: number) {
        this.initialActiveTab = this.tabs[tabIndex].id;
    }

    private onSuccess<T>(res: T[], target: T[]) {
        const sortedResponse = this.util.sortArrayByShowOrder(res);
        for (let i = 0; i < sortedResponse.length; i++) {
            target.push(sortedResponse[i]);
        }
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
