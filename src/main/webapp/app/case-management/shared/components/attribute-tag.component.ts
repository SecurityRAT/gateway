// tslint:disable-next-line
import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { CMAttribute } from '../';
@Component({
    selector: 'jhi-attribute-tag',
    template: `
        <div class="btn-group-toggle" *ngIf="checkboxType">
                <label [ngbTooltip]="attribute.description" placement="top" class="btn-outline-secondary btn-sm" [ngStyle]="{'margin-left.%': 5 * count}"
                style="margin: .1em .1em .1em 0;" ngbButtonLabel>
                    <input type="checkbox" [(ngModel)]="attribute.selected" [name]="attribute.name" ngbButton>{{attribute.name}}
                </label>
                <div *ngIf="attribute.selected">
                    <jhi-attribute-tag *ngFor="let child of attribute.children"
                    [attribute]="child" [parentAttribute]="attribute" [checkboxType]="checkboxType" [count]="count">
                    </jhi-attribute-tag>
                </div>
        </div>
    `
})

export class AttributeTagComponent implements OnInit {

    @Input() attribute: CMAttribute;

    @Input() parentAttribute: CMAttribute;

    @Input() checkboxType: boolean;

    @Input() count: number;

    ngOnInit() {
        this.count++;
    }
}
