import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RemotePersistenceImportInterface } from 'app/case-management/common';

@Component({
  selector: 'jhi-persistence-remote',
  templateUrl: './remote.component.html',
  styleUrls: ['./remote.component.scss']
})
export class RemoteComponent implements OnInit {
  persistenceInfo: any = {
    url: null,
    fields: []
  };

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {}
}
