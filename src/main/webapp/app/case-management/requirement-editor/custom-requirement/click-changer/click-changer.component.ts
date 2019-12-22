import { Component, Input, Output, EventEmitter } from '@angular/core';
import { faCheck, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'jhi-click-changer',
  templateUrl: 'click-changer.component.html'
})
export class ClickChangerComponent {
  @Input() textWhenEmpty: string;
  @Input() shownText;
  @Output() clickChangerSubmit = new EventEmitter<string>();

  // can the confirm and cancel button be seen
  buttonsVisible = false;
  faCheck = faCheck;
  faPencilAlt = faPencilAlt;

  // did user click in field and changes text
  changesText = false;

  // copy of text to restore after canceling
  shownTextBeforeSubmit: string;

  constructor() {}

  // tells the parent-component that user confirmed the text and sends this String
  // to the parent
  callParent(): void {
    this.clickChangerSubmit.emit(this.shownText);
  }
}
