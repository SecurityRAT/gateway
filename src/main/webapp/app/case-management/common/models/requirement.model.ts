import { BaseDomain, CMExtension } from '../';

export class CMEnhancementSubType {
    constructor(
        public keyId: number,
        public contents: CMExtension[]
    ) {
    }
}

export class CMStatusSubType {
    constructor(
        public keyId: number,
        public values: number[],
        public content?: string
    ) {

    }
}

export class CMRequirement implements BaseDomain {
    constructor(
        public id: number,
        public name: string,
        public categoryId: number,
        public showOrder: number,
        public feTags: number[],
        public parameters: number[],
        public enhancements: CMEnhancementSubType[],
        public status: CMStatusSubType[],
        public description?: string,
        public selected?: boolean,
        public tickets?: any[]

    ) {

    }
}
