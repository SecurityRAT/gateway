import { ISkAtEx } from 'app/shared/model/requirementManagement/sk-at-ex.model';
import { IRequirementSet } from 'app/shared/model/requirementManagement/requirement-set.model';

export interface ISkeleton {
  id?: number;
  name?: string;
  description?: any;
  showOrder?: number;
  active?: boolean;
  skAtExes?: ISkAtEx[];
  requirementSet?: IRequirementSet;
}

export class Skeleton implements ISkeleton {
  constructor(
    public id?: number,
    public name?: string,
    public description?: any,
    public showOrder?: number,
    public active?: boolean,
    public skAtExes?: ISkAtEx[],
    public requirementSet?: IRequirementSet
  ) {
    this.active = this.active || false;
  }
}
