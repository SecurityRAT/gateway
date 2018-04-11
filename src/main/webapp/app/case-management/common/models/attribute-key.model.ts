import { BaseDomain } from '../';

export enum CMAttributeType {
    FETAG = 'FE_TAG',
    PARAMETER = 'PARAMETER',
    CATEGORY = 'CATEGORY'
}

export class CMAttributeKey implements BaseDomain {
    constructor(
        public id: number,
        public name: string,
        public showOrder: number,
        public description?: string,
        public selected?: boolean
    ) {
    }
}
