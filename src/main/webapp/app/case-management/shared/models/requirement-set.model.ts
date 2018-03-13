import { BaseDomain } from './base-domain.model';

export class RequirementSet implements BaseDomain {
    constructor(
        public id: number,
        public name: String,
        public description: String,
        public showOrder: number
     ) {
    }
}
