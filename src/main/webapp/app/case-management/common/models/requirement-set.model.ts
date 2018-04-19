import { BaseDomain } from '../';

export class CMRequirementSet implements BaseDomain {
    constructor(
        public id: number,
        public name: string,
        public showOrder: number,
        public description?: string
     ) {
    }
}
