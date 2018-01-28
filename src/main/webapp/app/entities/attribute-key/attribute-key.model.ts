import { BaseEntity } from './../../shared';

export const enum AttributeType {
    'FE_TAG',
    'PARAMETER',
    'CATEGORY'
}

export class AttributeKey implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public description?: any,
        public type?: AttributeType,
        public showOrder?: number,
        public active?: boolean,
        public attributes?: BaseEntity[],
        public requirementSet?: BaseEntity,
    ) {
        this.active = false;
    }
}
