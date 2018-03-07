import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { Principal } from '../';
import { LoginService } from '../login/login.service';
import { StateStorageService } from './state-storage.service';

/**
 * @whatItDoes Implements a "CanActivate" router guards for authorization.
 * This determines whether a user has permission to access a route (only in the frontend).
 *
 * @howToUse
 *
 * ```
 * export const componentRoute : Route = {
        path: 'myPath',
        component: MyComponent
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myTitle'
        },
        canActivate: [UserRouteAccessService]
    }
 * ```
 */
@Injectable()
export class UserRouteAccessService implements CanActivate {

    constructor(private router: Router,
                private loginService: LoginService,
                private principal: Principal,
                private stateStorageService: StateStorageService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> {

        const authorities = route.data['authorities'];
        // We need to call the checkLogin / and so the principal.identity() function, to ensure,
        // that the client has a principal too, if they already logged in by the server.
        // This could happen on a page refresh.
        return this.checkLogin(authorities, state.url);
    }

    checkLogin(authorities: string[], url: string): Promise<boolean> {
        const principal = this.principal;
        return Promise.resolve(principal.identity().then((account) => {

            if (!authorities || authorities.length === 0) {
                return true;
            }

            if (account) {
                return principal.hasAnyAuthority(authorities).then((response) => {
                    if (response) {
                        return true;
                    }
                    return false;
                });
            }

            this.stateStorageService.storeUrl(url);
            this.router.navigate(['accessdenied']).then(() => {
                // only show the login dialog, if the user hasn't logged in yet
                if (!account) {
                    this.loginService.login();
                }
            });
            return false;
        }));
    }
}
