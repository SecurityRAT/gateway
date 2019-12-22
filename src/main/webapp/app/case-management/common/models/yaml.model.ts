import { CMRequirement } from '..';
import { VERSION } from '../../../app.constants';

export class ArtifactInfo {
  constructor(public name: string, public persistenceInfo?: any, public settings?: any) {}
}

export class ArtifactRequirementsDates {
  constructor(public generatedOn: Date, public lastUpdatedOn: Date, public lastSavedOn: Date) {}
}
export class YamlObject {
  constructor(
    public securityRATVersion: string | undefined,
    public artifactInfo: ArtifactInfo,
    public dates: ArtifactRequirementsDates,
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
