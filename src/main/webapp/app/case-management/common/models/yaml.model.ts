import { CMRequirement } from '..';
import { VERSION } from '../../../app.constants';

export class ArtifactInfo {
    name: string;
    persistenceInfo: any;
}

export class YamlObject {
    constructor(
        public securityRATVersion: string,
        public artifactInfo: ArtifactInfo,
        public settings: any,
        public generatedOn: Date,
        public lastSaved: Date,
        public requirements: CMRequirement
    ) {
        this.securityRATVersion = VERSION;
    }
}

export class YamlFile {
    constructor(
        public filename: string,
        public generatedOn: Date,
        public contentUrl: string // URL from where the file content could be downloaded.
    ) {}
}
