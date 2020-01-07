/**
 * Represents the structure of a field object used for importing and exporting to a remote servce,
 */
export class Field {
  constructor(
    public name: string, // the name of the field
    public type?: string, // The type of the values accepted by this field
    public value?: any,
    public autoCompleteUrl?: string, // an URL to send query for auto completion.
    public selectionValues?: any[] // an array of options to be selected from.
  ) {}
}
