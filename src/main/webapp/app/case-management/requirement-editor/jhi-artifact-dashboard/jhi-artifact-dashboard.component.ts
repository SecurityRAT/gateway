import { Component, OnInit, Input } from '@angular/core';
import {
  CMAttribute,
  ArtifactInfo,
  CMAttributeKey,
  CMRequirementSet
} from '../../common';

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

  constructor(
  ) {
    this.attributeKeys = [];

    this.attributes = [];
  }

  changeIcon() {
    this.isOpen = !this.isOpen;
  }

  ngOnInit() {
    this.isOpen = true;
  }
}
