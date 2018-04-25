import { Component, OnInit, Input } from '@angular/core';
import { CMAttribute, ArtifactInfo, CMAttributeKey } from '../../common';

@Component({
  selector: 'jhi-artifact-dashboard',
  templateUrl: './jhi-artifact-dashboard.component.html',
  styles: [`
  .dashboard /deep/ .card-header{
    background-color: #003D66;
  }

  .dashboard /deep/ .card-header > a {
    color: #fff;
  }
`]
})

export class JhiArtifactDashboardComponent implements OnInit {
  isOpen: boolean;

  @Input() artifactInfo: ArtifactInfo;
  @Input() creationDate: String;
  @Input() requirementSet: String;
  @Input() attributes: CMAttribute[];
  @Input() attributeKeys: CMAttributeKey[];

  @Input() attribute: CMAttribute;
  @Input() parentAttribute: CMAttribute;

  constructor() {
    this.artifactInfo = new ArtifactInfo();
    this.artifactInfo.name = ' TestArtifactName';
    this.creationDate = '10-10-1980';
    this.requirementSet = 'External';

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
}
