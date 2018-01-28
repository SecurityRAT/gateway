import { BaseEntity } from './../../shared';

export const enum ExtensionSection {
    'STATUS',
    'ENHANCEMENT'
}

export const enum ExtensionType {
    'ENUM',
    'FREETEXT'
}

export class ExtensionKey implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public description?: any,
        public section?: ExtensionSection,
        public type?: ExtensionType,
        public showOrder?: number,
        public active?: boolean,
        public extensions?: BaseEntity[],
        public requirementSet?: BaseEntity,
    ) {
        this.active = false;
    }
}
