import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'jhi-click-changer',
  templateUrl: 'click-changer.component.html'
})
export class ClickChangerComponent {
  @Input() textWhenEmpty: String;
  @Input() shownText;
  @Output() clickChangerSubmit = new EventEmitter<String>();

  // can the confirm and cancel button be seen
  buttonsVisible = false;

  // did user click in field and changes text
  changesText = false;

  // copy of text to restore after canceling
  shownTextBeforeSubmit: String;

  constructor() { }

  // tells the parent-component that user confirmed the text and sends this String
  // to the parent
  callParent() {
    this.clickChangerSubmit.emit(this.shownText);
  }

}
