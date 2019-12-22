import { Injectable } from '@angular/core';
import { YamlObject, YamlFile } from '../models/yaml.model';
import { Field } from '../models/field.model';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { RemoteExportImportInterface } from '../interface/remote-service';

@Injectable({
  providedIn: 'root'
})
export class JiraService implements RemoteExportImportInterface {
  constructor() {}

  getYamlFileVersions(url: string): Observable<HttpResponse<YamlFile[]>> {
    throw new Error('Method not implemented.');
  }
  importRequirements(yamlFile: YamlFile): Observable<any> {
    throw new Error('Method not implemented.');
  }
  exportRequirements(url: string, fileContent: YamlObject, fields: any[]): Observable<HttpResponse<any>> {
    throw new Error('Method not implemented.');
  }
  getMandatoryFields(url: string): Observable<HttpResponse<Field[]>> {
    throw new Error('Method not implemented.');
  }
  authenticate(url: string): Observable<HttpResponse<boolean>> {
    throw new Error('Method not implemented.');
  }
  checkExportUrl(url: string): Observable<HttpResponse<boolean>> {
    throw new Error('Method not implemented.');
  }
  checkImportUrl(url: string): Observable<HttpResponse<boolean>> {
    throw new Error('Method not implemented.');
  }
  errorResponseHandler<T>(response: HttpResponse<T>, info?: any): Observable<string> {
    throw new Error('Method not implemented.');
  }
}
