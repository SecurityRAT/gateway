export class CMExtension {
    constructor(
        public id: number,
        public content: string,
        public showOrder?: number,
        public description?: string,
    ) {
    }
}
