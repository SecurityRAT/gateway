import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IExtensionKey } from 'app/shared/model/requirementManagement/extension-key.model';

type EntityResponseType = HttpResponse<IExtensionKey>;
type EntityArrayResponseType = HttpResponse<IExtensionKey[]>;

@Injectable({ providedIn: 'root' })
export class ExtensionKeyService {
  public resourceUrl = SERVER_API_URL + 'services/requirementmanagement/api/extension-keys';

  constructor(protected http: HttpClient) {}

  create(extensionKey: IExtensionKey): Observable<EntityResponseType> {
    return this.http.post<IExtensionKey>(this.resourceUrl, extensionKey, { observe: 'response' });
  }

  update(extensionKey: IExtensionKey): Observable<EntityResponseType> {
    return this.http.put<IExtensionKey>(this.resourceUrl, extensionKey, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IExtensionKey>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IExtensionKey[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
