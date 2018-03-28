import { Injectable } from '@angular/core';
import { JhiEventManager } from 'ng-jhipster';
import { ARTIFACT_SETTINGS_OBS } from '../';

@Injectable()
export class CMDataSharingService extends JhiEventManager {

    private artifactSettings: any;

    constructor() {
        super();
        this.artifactSettings = {
            subscription : Object.create(null),
            content : Object.create(null)
        };
    }

    registerArtifactSettingsObservable() {
        this.artifactSettings.subscription = super.subscribe(ARTIFACT_SETTINGS_OBS, (response) => {
            this.artifactSettings.content = response.content;
        });
    }

    broadcastData(value: any) {
        super.broadcast(value);
    }

    getArtifactSettings(): Object {
        return this.artifactSettings;
    }
}
