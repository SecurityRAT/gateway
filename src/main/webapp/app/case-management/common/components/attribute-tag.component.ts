// tslint:disable-next-line
import { Component, OnInit, Input, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { CMAttribute } from '../';
@Component({
    selector: 'jhi-attribute-tag',
    templateUrl: './attribute-tag.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class AttributeTagComponent implements OnInit {

    @Input() attribute: CMAttribute;

    @Input() parentAttribute: CMAttribute;

    @Input() checkboxType: boolean;

    @Input() showChildrenOnSelect: boolean;

    @Input() count: number;

    ngOnInit() {
        // This is needed to evaluate the indentations in the view.
        this.count++;
    }
}
