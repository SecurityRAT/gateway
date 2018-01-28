import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { GatewayRequirementSetModule } from './requirement-set/requirement-set.module';
import { GatewaySkeletonModule } from './skeleton/skeleton.module';
import { GatewayAttributeKeyModule } from './attribute-key/attribute-key.module';
import { GatewayAttributeModule } from './attribute/attribute.module';
import { GatewayExtensionKeyModule } from './extension-key/extension-key.module';
import { GatewayExtensionModule } from './extension/extension.module';
import { GatewaySkAtExModule } from './sk-at-ex/sk-at-ex.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        GatewayRequirementSetModule,
        GatewaySkeletonModule,
        GatewayAttributeKeyModule,
        GatewayAttributeModule,
        GatewayExtensionKeyModule,
        GatewayExtensionModule,
        GatewaySkAtExModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayEntityModule {}
