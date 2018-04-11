import { CMRequirement } from '..';

export class ArtifactInfo {
    name: string;
    service: any;
}

export class YamlObject {
    constructor(
        public artifactInfo: ArtifactInfo,
        public settings: any,
        public generatedOn: Date,
        public lastSaved: Date,
        public requirements: CMRequirement
    ) {

    }
}

export class YamlFile {
    constructor(
        public filename: string,
        public generatedOn: Date,
        public contentUrl: string // URL from where the file content could be downloaded.
    ) {}
}
