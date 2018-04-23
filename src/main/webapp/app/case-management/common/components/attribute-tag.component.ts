// tslint:disable-next-line
import { Component, OnInit, Input, forwardRef, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { CMAttribute } from '../';
@Component({
    selector: 'jhi-attribute-tag',
    template: `
        <div class="btn-group-toggle" *ngIf="checkboxType">
                <label [ngbTooltip]="attribute.description" placement="top" class="btn-outline-secondary btn-sm" [ngStyle]="{'margin-left.%': 5 * count}"
                style="margin: .1em .1em .1em 0;" ngbButtonLabel>
                    <input type="checkbox" [(ngModel)]="attribute.selected" [name]="attribute.name" (change)="_selectAttribute()" ngbButton>{{attribute.name}}
                </label>
                <ng-container *ngIf="(!showChildrenOnSelect) || (attribute.selected && showChildrenOnSelect)">
                    <jhi-attribute-tag *ngFor="let child of attribute.children" [showChildrenOnSelect]="showChildrenOnSelect"
                    [attribute]="child" [checkboxType]="checkboxType" [count]="count" (attributeSelectionChanged)="_selectAttribute($event)">
                    </jhi-attribute-tag>
                </ng-container>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class AttributeTagComponent implements OnInit {

    @Input() attribute: CMAttribute;

    @Input() checkboxType: boolean;

    @Input() showChildrenOnSelect: boolean;

    @Input() count: number;

    @Output() attributeSelectionChanged = new EventEmitter<CMAttribute>();

    ngOnInit() {
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
