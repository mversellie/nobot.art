import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../authentication/authentication.service";

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent {

    model: any[] = [];

    constructor(protected authService:AuthenticationService) {
        this.model = [
            {
                label: 'Apps',
                icon: 'pi pi-th-large',
                items: [
                    {
                        label: 'Create Post',
                        icon: 'pi pi-fw pi-pencil',
                        routerLink: ['/create'],
                        visible:authService.isLoggedIn()
                    },
                    {
                        label: 'Private Messages',
                        icon: 'pi pi-fw pi-comments',
                        routerLink: ['/private-messages'],
                        visible:authService.isLoggedIn()
                    },

                    {
                        label: 'Settings',
                        icon: 'pi pi-fw pi-plus',
                        routerLink: ['/settings'],
                        visible:authService.isLoggedIn()
                    },


                    {
                        label: 'Login',
                        icon: 'pi pi-fw pi-plus',
                        routerLink: ['/login'],
                        visible:!authService.isLoggedIn()
                    }
                ]
            }
        ];
    }

    noAuth(menuItem:any){
        console.log(menuItem["loggedIn"])
        const ret =  menuItem["loggedIn"] == null  || menuItem["loggedIn"] == false
        console.log(ret)
        return ret
    }
}
