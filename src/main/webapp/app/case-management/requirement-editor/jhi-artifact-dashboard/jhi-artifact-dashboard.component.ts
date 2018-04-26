import { Component, OnInit, Input } from '@angular/core';
import { CMAttribute, ArtifactInfo, CMAttributeKey, CMRequirementSet } from '../../common';

@Component({
  selector: 'jhi-artifact-dashboard',
  templateUrl: './jhi-artifact-dashboard.component.html',
  styleUrls: [
    './jhi-artifact-dashboard.component.css'
  ]
})

export class JhiArtifactDashboardComponent implements OnInit {
  isOpen: boolean;

  @Input() artifactInfo: ArtifactInfo;
  @Input() creationDate: Date;
  @Input() lastSaved: Date;
  @Input() requirementSet: CMRequirementSet;
  @Input() attributes: CMAttribute[];
  @Input() attributeKeys: CMAttributeKey[];

  constructor() {
    this.attributeKeys = [
      // new CMAttributeKey(1, 'first Key', 10),
      // new CMAttributeKey(2, 'second Key', 20),
      // new CMAttributeKey(3, 'third Key', 30),
      // new CMAttributeKey(4, 'fourth Key', 30)
    ];

    this.attributes = [
      // new CMAttribute(2, 'ro2 attr', 20, 2, '', [], true),
      // new CMAttribute(2, 'row3 attr', 20, 3, '', [
      //   new CMAttribute(1, 'row3 c 1', 10, 3, '', [
      //     new CMAttribute(1, 'row3 c2', 10, 3, '', [
      //       new CMAttribute(1, 'row3 c3', 10, 3, '', [], true)
      //     ], true)
      //   ], true)
      // ], true),
      // new CMAttribute(2, 'second attr', 20, 2, '', [], true),
      // new CMAttribute(1, 'first Attr', 10, 1, '', [
      //   new CMAttribute(1, 'first Child', 10, 1, '', [], true),
      //   new CMAttribute(1, 'second Child', 10, 1, '', [], true)]
      //   , true),
      // new CMAttribute(3, 'third attr', 30, 3, '', [new CMAttribute(1, 'fourth Child', 10, 1, '', [
      //   new CMAttribute(1, 'AAAAAAA', 10, 3, '', [
      //     new CMAttribute(1, 'BBBB', 10, 3, '', [], true)
      //   ], true)
      // ], true)
      // ],
      //   true),
      // new CMAttribute(1, 'r1 1', 10, 1, '', [
      //   new CMAttribute(1, 'r1 2', 10, 1, '', [], true),
      //   new CMAttribute(1, 'r1 3', 10, 1, '', [], true)]
      //   , true),
    ];
  }

  public changeIcon() {
    this.isOpen = !this.isOpen;
  }

  ngOnInit() {
    this.isOpen = true;
  }

 /* open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }*/

}
