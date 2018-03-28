import { BaseDomain } from './base-domain.model';

export enum CMAttributeType {
    FETAG = 'FE_TAG',
    PARAMETER = 'PARAMETER',
    CATEGORY = 'CATEGORY'
}

export class CMAttributeKey implements BaseDomain {
    constructor(
        public id: number,
        public name: String,
        public showOrder: number,
        public description?: String
    ) {
    }
}
