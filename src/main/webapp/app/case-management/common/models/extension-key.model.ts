import { BaseDomain, CMExtension } from '../';

export enum CMExtensionType {
    ENUM = 'ENUM',
    FREETEXT = 'FREETEXT'
}

export class CMExtensionKey implements BaseDomain {
    constructor(
        public id: number,
        public name: string,
        public description?: string,
        public showOrder?: number,
        public type?: CMExtensionType,
        public values?: CMExtension[]
    ) {
    }
}
