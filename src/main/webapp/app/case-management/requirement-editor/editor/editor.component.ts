import { Component, OnInit } from '@angular/core';
import {
    CMAttributeKey,
    // CMDataSharingService
} from '../../shared';

@Component({
    selector: 'jhi-editor',
    template: '<p>{{artifactName}}</p>'
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
