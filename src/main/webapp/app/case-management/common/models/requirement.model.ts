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
        public tickets?: any[],
        public viewOptions?: any

    ) {
        /*  This prevents filters from returning new array references after filtering, which is a best practice
            (See https://angular.io/guide/pipes#appendix-no-filterpipe-or-orderbypipe.)

            This is done because the filtered array can be edited from the user. These Changes have to be tracked once
            the filters are removed or changed resulting to increased complexity.

            This solution can be temporary.
        */
        this.viewOptions = {
            show: true
        };

    }
}
