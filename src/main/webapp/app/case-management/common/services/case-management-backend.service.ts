import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../../app.constants';
import { createRequestOption } from '../../../shared';
import {
    CMRequirementSet,
    CMAttributeKey,
    CMAttribute,
    CMAttributeType,
    CMRequirement,
    CMExtensionKey,
    STATUS_URI,
    ATTRIBUTE_URI,
    ATTRIBUTES_URI,
    ATTRIBUTEKEY_URI,
    ATTRIBUTEKEYS_URI,
    REQUIREMENTSET_URI,
    REQUIREMENTS_URI,
    REQUIREMENTSETS_URI,
    ENHANCEMENTS_URI
} from '../'; // this references to the index.ts Barrel
import * as attributeKeys from '../../attributes-keys.mock.json';
import * as attributes from '../../attributes.mock.json';
import * as requirements from '../../requirements.mock.json';
import * as enhancements from '../../enhancements.mock.json';
import * as status from '../../status.mock.json';
import * as categories from '../../categories.mock.json';
import * as tagKeys from '../../tag-keys.mock.json';
import * as tags from '../../tags.mock.json';

 type RequirementSetResponseType = HttpResponse<CMRequirementSet[]>;
@Injectable()
export class CaseManagementBackendService {

    private resourceUrl = SERVER_API_URL + 'caseManagement/api';

    constructor(private httpClient: HttpClient) { }

    query<T>(c: { new(...args: any[]): T}, uri: string, params?: Object, headers?: HttpHeaders): Observable<HttpResponse<T[]>> {
        const options = createRequestOption(params);
        return this.httpClient.get<T[]>(`${this.resourceUrl}${uri}`, { params: options, headers, observe: 'response' }).map((res: HttpResponse<T[]>) => {
            return this.convertResponseArrayToType(res);
        });
    }

    /**
     * Fetch all active requirement sets.
     */
    getRequirementSets(ids?: number[]): Observable<RequirementSetResponseType> {
        let uri = REQUIREMENTSETS_URI;
        let options;

        if (ids) {
            uri = REQUIREMENTSET_URI;
            options = {
                ids
            };
        }
        return this.query(CMRequirementSet, uri, options);
    }

    /**
     * Fetches active attribute keys according to the query parameters provided.
     * @param requirementSet The requirement set identifier link to the attribute keys
     * @param type The type of the attribute key
     */
    findAttributeKeys(requirementSet: number, type?: CMAttributeType): Observable<HttpResponse<CMAttributeKey[]>> {
        const params = {
            requirementSet,
            type
        };
        return Observable.of(this.convertResponseArrayToType(new HttpResponse({
            body: this.getMockAttributeKeys()
        })));
    }

    /**
     * Fetch the attribute keys with the given ids
     * @param ids the list of the attribute key ids
     */
    getAttributeKeys(ids: number[]): Observable<HttpResponse<CMAttribute[]>> {
        const params = {
            ids
        };
        return Observable.of(this.convertResponseArrayToType(new HttpResponse({
            body: this.getMockAttributeKeys()
        })));
    }

    /**
     * Fetches active attributes according to the query parameters provided.
     * @param requirementSet The requirement set identifier link to the attribute keys
     * @param type The type of the attribute key
     */
    findAttributes(requirementSet: number, type?: CMAttributeType): Observable<HttpResponse<CMAttribute[]>> {
        const options = {
            requirementSet,
            type
        };
        return Observable.of(this.convertResponseArrayToType(new HttpResponse({
            body: this.getMockAttributes()
        })));
    }

    /**
     * Fetch the attributes with the given ids
     * @param ids the list of the attribute ids
     */
    getAttributes(ids: number[]): Observable<HttpResponse<CMAttribute[]>> {
        const options = {
            ids
        };
        return Observable.of(this.convertResponseArrayToType(new HttpResponse({
            body: this.getMockAttributes()
        })));
    }

    findEnhancements(requirementSet: number): Observable<HttpResponse<CMExtensionKey[]>> {
        return Observable.of(this.convertResponseArrayToType(new HttpResponse({
            body: this.getMockEnhancements()
        })));
    }

    findStatus(requirementSet: number): Observable<HttpResponse<CMExtensionKey[]>> {
        return Observable.of(this.convertResponseArrayToType(new HttpResponse({
            body: this.getMockStatus()
        })));
    }

    /**
     * Fetch requirements according to the given parameters.
     * @param requirementSet the requirement set id
     * @param attributeIds the list of attribute ids
     */
    fetchRequirements(requirementSet: number, attributeIds: number[]): Observable<HttpResponse<CMRequirement[]>> {
        const options = {
            requirementSet,
            attributeIds
        };
        return Observable.of(this.convertResponseArrayToType(new HttpResponse({
            body: this.getMockRequirements()
        })));
    }

    getMockTagKeys(): Observable<HttpResponse<CMAttributeKey[]>> {
        const mockTagKeys: CMAttributeKey[] = [];
        (<any>tagKeys).forEach((element) => {
            mockTagKeys.push(new CMAttributeKey(
                element.id,
                element.name,
                element.showOrder,
                element.description
            ));
        });
        return Observable.of(this.convertResponseArrayToType(new HttpResponse({
            body: mockTagKeys
        })));
    }

    getMockTags(): Observable<HttpResponse<CMAttribute[]>> {
        const mockTags: CMAttribute[] = [];
        (<any>tags).forEach((element) => {
            mockTags.push(new CMAttribute(
                element.id,
                element.name,
                element.showOrder,
                element.keyId,
                element.description,
                element.children
            ));
        });
        return Observable.of(this.convertResponseArrayToType(new HttpResponse({
            body: mockTags
        })));
    }
    getMockAttributeKeys(): CMAttributeKey[] {
        const mockAttributeKeys: CMAttributeKey[] = [];
        (<any>attributeKeys).forEach((element) => {
            mockAttributeKeys.push(new CMAttributeKey(
                element.id,
                element.name,
                element.showOrder,
                element.description
            ));
        });
        return mockAttributeKeys;
    }

    getMockCategories(): Observable<HttpResponse<CMAttribute[]>> {
        const mockCategories: CMAttribute[] = [];
        (<any>categories).forEach((element) => {
            mockCategories.push(new CMAttribute(
                element.id,
                element.name,
                element.showOrder,
                element.keyId,
                element.description,
                element.children
            ));
        });
        return Observable.of(this.convertResponseArrayToType(new HttpResponse({
            body: mockCategories
        })));
    }

    getMockAttributes(): CMAttribute[] {
        const mockAttributes: CMAttribute[] = [];
        (<any>attributes).forEach((element) => {
            mockAttributes.push(new CMAttribute(
                element.id,
                element.name,
                element.showOrder,
                element.keyId,
                element.description,
                element.children
            ));
        });
        return mockAttributes;
    }

    getMockRequirements(): CMRequirement[] {
        const mockRequirements: CMRequirement[] = [];
        (<any>requirements).forEach((element) => {
            mockRequirements.push(new CMRequirement(
                element.id,
                element.name,
                element.categoryId,
                element.showOrder,
                element.feTags,
                element.parameters,
                element.enhancements,
                element.status,
                element.description,
            ));
        });
        return mockRequirements;
    }

    getMockCustomRequirements(): CMRequirement[] {
       const customRequirements: CMRequirement[] = [];
       const allRequirements: CMRequirement[] = this.getMockRequirements();
       allRequirements.forEach((element: CMRequirement ) => {
           if (element.name.includes('CUS')) {
            customRequirements.push(element);
           }
       });
       return customRequirements;
    }

    getMockEnhancements(): CMExtensionKey[] {
        const mockEnhancements: CMExtensionKey[] = [];
        (<any>enhancements).forEach((element) => {
            mockEnhancements.push(new CMExtensionKey(
                element.id,
                element.name,
                element.description,
                element.showOrder
            ));
        });
        return mockEnhancements;
    }

    getMockStatus(): CMExtensionKey[] {
        const mockStatus: CMExtensionKey[] = [];
        (<any>status).forEach((element) => {
            mockStatus.push(new CMExtensionKey(
                element.id,
                element.name,
                element.description,
                element.showOrder,
                element.type,
                element.values
            ));
        });
        return mockStatus;
    }

    private convertItemFromServer<T>(item: T): T {
        const copy: T = Object.assign({}, item);
        return copy;
    }

    /**
     * Converts the HTTP response to the appropriate type.
     * @param res The {@link HttpResponse} object
     */
    private convertResponseArrayToType<T>(res: HttpResponse<T[]>): HttpResponse<T[]> {
        const jsonResponse: T[] = res.body;
        const body: T[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            const item: T = Object.assign({}, this.convertItemFromServer(jsonResponse[i]));
            body.push(item);
        }
        return res.clone({ body });
    }
}
