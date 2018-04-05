import { BaseDomain } from './base-domain.model';

export class CMRequirementSet implements BaseDomain {
    constructor(
        public id: number,
        public name: String,
        public showOrder: number,
        public description?: String
     ) {
    }
}
