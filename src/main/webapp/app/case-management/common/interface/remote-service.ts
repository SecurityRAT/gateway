import { YamlObject, YamlFile } from '../models/yaml.model';
import { Field } from '../models/field.model';
import { Observable, from } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

/**
 * Interface for the remote export/import of requirements.
 */
export interface RemoteExportImportInterface {
  /**
   * Retrieve available requirementSet versions
   * @param url The URL of the service.
   * @returns An http observable with a list of files. The could be more than one version of the requirement set.
   */
  getYamlFileVersions(url: string): Observable<HttpResponse<YamlFile[]>>;

  /**
   * Imports requirements from the given YAML file information
   * @param yamlFile the Yaml file information to download the content
   * @returns An observable with the content of the yaml file version
   */
  importRequirements(yamlFile: YamlFile): Observable<any>;

  /**
   * Exports the requirements to a remote service.
   * @param url The appriopriate URL of the service.
   * @param fileContent The yaml object to be exported
   * @param fields The necessary fields with their corresponding values required for the export
   * @returns An http observable with a object. Most probably in the form {url: '', alias: ''}
   */
  exportRequirements(url: string, fileContent: YamlObject, fields: any[]): Observable<HttpResponse<any>>;

  /**
   * Retrieves the mandatory field given an appropriate URL.
   * @param url the appropriate URL from which the mandatory fields can be fetched.
   */
  getMandatoryFields(url: string): Observable<HttpResponse<Field[]>>;

  /**
   * Authenticate the user to service.
   * @param url the URL of the service. Preferably the URL to the home page of the web app.
   */
  authenticate(url: string): Observable<HttpResponse<boolean>>;

  /**
   * Checks the validity of the given URL when exporting requirements.
   * @param url the URL to be checked.
   */
  checkExportUrl(url: string): Observable<HttpResponse<boolean>>;

  /**
   * Checks the validity of the given URL when importing requirements.
   * @param url the URL to be checked.
   */
  checkImportUrl(url: string): Observable<HttpResponse<boolean>>;

  /**
   * Generates an error message given the http response and other information.
   * @param response the http response from which the error message should be crafted.
   * @param info additional information. This is optional
   */
  errorResponseHandler<T>(response: HttpResponse<T>, info?: any): Observable<string>;
}
