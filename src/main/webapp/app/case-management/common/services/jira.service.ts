import { Injectable } from '@angular/core';
import { YamlObject, YamlFile } from '../models/yaml.model';
import { Field } from '../models/field.model';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { RemotePersistenceImportInterface } from '../interface/remote-service';
import * as urlParser from 'url-parse';

@Injectable({
  providedIn: 'root'
})
export class JiraService implements RemotePersistenceImportInterface {
  constructor() {}

  getYamlFileVersions(url: string): Observable<HttpResponse<YamlFile[]>> {
    throw new Error('Method not implemented.');
  }
  importRequirements(yamlFile: YamlFile): Observable<any> {
    throw new Error('Method not implemented.');
  }
  exportRequirements(url: string, fileContent: YamlObject, fields: Field[]): Observable<HttpResponse<any>> {
    throw new Error('Method not implemented.');
  }
  getMandatoryFields(url: string): Observable<HttpResponse<Field[]>> {
    throw new Error('Method not implemented.');
  }
  authenticate(url: string): Observable<HttpResponse<boolean>> {
    throw new Error('Method not implemented.');
  }
  getPersistenceUrlValidationPattern(): string {
    throw new Error('Method not implemented.');
  }
  getImportUrlValidationPattern(): string {
    throw new Error('Method not implemented.');
  }
  errorResponseHandler<T>(response: HttpResponse<T>, info?: any): Observable<string> {
    throw new Error('Method not implemented.');
  }
}
