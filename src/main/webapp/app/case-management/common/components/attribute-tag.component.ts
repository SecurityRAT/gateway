// tslint:disable-next-line
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CMAttribute } from '../';
@Component({
  selector: 'jhi-attribute-tag',
  templateUrl: './attribute-tag.component.html'
})
export class AttributeTagComponent implements OnInit {
  @Input() attribute: CMAttribute;

  @Input() checkboxType: boolean;

  @Input() showChildrenOnSelect: boolean;

  @Input() count: number;

  @Output() attributeSelectionChanged = new EventEmitter<CMAttribute>();

  ngOnInit(): void {
    // This is needed to evaluate the indentations in the view.
    this.count++;
  }

  /**
   * Emmits the 'attribute' property when this called by the top level node, otherwise the 'attr' parameter.
   * @param attr the attribute to be emmited
   */
  /* tslint:disable-next-line */
  private _selectAttribute(attr?: CMAttribute) {
    if (attr !== undefined) {
      this.attributeSelectionChanged.emit(attr);
    } else {
      this.attributeSelectionChanged.emit(this.attribute);
    }
  }
}
