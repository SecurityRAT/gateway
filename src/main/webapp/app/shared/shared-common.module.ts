import { NgModule, LOCALE_ID } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import locale from '@angular/common/locales/en';

import {
    GatewaySharedLibsModule,
    JhiAlertComponent,
    JhiAlertErrorComponent,
    SanitizeMarkdownPipe
} from './';
@NgModule({
    imports: [
        GatewaySharedLibsModule
    ],
    declarations: [
        JhiAlertComponent,
        JhiAlertErrorComponent,
        SanitizeMarkdownPipe
    ],
    providers: [
        Title,
        {
            provide: LOCALE_ID,
            useValue: 'en'
        },
    ],
    exports: [
        GatewaySharedLibsModule,
        JhiAlertComponent,
        JhiAlertErrorComponent,
        SanitizeMarkdownPipe
    ]
})
export class GatewaySharedCommonModule {
    constructor() {
        registerLocaleData(locale);
    }
}
