import { Component, OnInit } from '@angular/core';
import {
    CMAttributeKey,
    // CMDataSharingService
} from '../../common';

@Component({
    selector: 'jhi-editor',
    template: '<jhi-artifact-dashboard></jhi-artifact-dashboard>'
})

export class EditorComponent implements OnInit {
    attributeKeys: CMAttributeKey[];
    artifactName: String;

    constructor(
        // private jhiEventManager: JhiEventManager,
        // private dataSharingService: CMDataSharingService
    ) {
        this.attributeKeys = [];
        this.artifactName = '';
    }

    ngOnInit() {
    }
}
