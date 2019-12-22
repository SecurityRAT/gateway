import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IExtension } from 'app/shared/model/requirementManagement/extension.model';

type EntityResponseType = HttpResponse<IExtension>;
type EntityArrayResponseType = HttpResponse<IExtension[]>;

@Injectable({ providedIn: 'root' })
export class ExtensionService {
  public resourceUrl = SERVER_API_URL + 'services/requirementmanagement/api/extensions';

  constructor(protected http: HttpClient) {}

  create(extension: IExtension): Observable<EntityResponseType> {
    return this.http.post<IExtension>(this.resourceUrl, extension, { observe: 'response' });
  }

  update(extension: IExtension): Observable<EntityResponseType> {
    return this.http.put<IExtension>(this.resourceUrl, extension, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IExtension>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IExtension[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
