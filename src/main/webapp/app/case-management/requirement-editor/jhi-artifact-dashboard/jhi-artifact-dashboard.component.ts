import { Component, OnInit, Input } from '@angular/core';
import { faWindowMaximize, faWindowMinimize } from '@fortawesome/free-solid-svg-icons';
import { CMAttribute, ArtifactInfo, CMAttributeKey, CMRequirementSet } from '../../common';

@Component({
  selector: 'jhi-artifact-dashboard',
  templateUrl: './jhi-artifact-dashboard.component.html',
  styleUrls: ['./jhi-artifact-dashboard.component.scss']
})
export class JhiArtifactDashboardComponent implements OnInit {
  isOpen: boolean;
  faWindowMinimize = faWindowMinimize;
  faWindowMaximize = faWindowMaximize;

  @Input() artifactInfo: ArtifactInfo;
  @Input() creationDate: Date;
  @Input() lastSaved: Date;
  @Input() requirementSet: CMRequirementSet;
  @Input() attributes: CMAttribute[];
  @Input() attributeKeys: CMAttributeKey[];

  constructor() {
    this.attributeKeys = [];

    this.attributes = [];
  }

  changeIcon(): void {
    this.isOpen = !this.isOpen;
  }

  ngOnInit(): void {
    this.isOpen = false;
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
