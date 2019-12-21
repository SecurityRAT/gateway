import { YamlObject } from '..';
import { Observable } from 'rxjs';

/**
 * Interface for the local export/import of requirements
 */
export interface LocalExportImportInterface {
  /**
   * Imports from local file.
   * @param yamlFile file to be imported
   */
  importRequirements(yamlFile: any): Observable<any>;

  /**
   * Export requirements locally
   * @param yamlContent yaml content to be exported
   */
  exportRequirements(yamlContent: YamlObject): Observable<any>;
}
