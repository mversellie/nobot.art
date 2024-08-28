import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(private user:UserService) {
    }

    ngOnInit() {
        this.model = [
            {
                label: 'Apps',
                icon: 'pi pi-th-large',
                items: [
                    {
                        label: 'Create Post',
                        icon: 'pi pi-fw pi-pencil',
                        routerLink: ['/create']
                    },
                    {
                        label: 'Blog',
                        icon: 'pi pi-fw pi-comment',
                        items: [
                            {
                                label: 'List',
                                icon: 'pi pi-fw pi-image',
                                routerLink: ['/apps/blog/list']
                            },
                        ]
                    },
                    {
                        label: 'Private Messages',
                        icon: 'pi pi-fw pi-comments',
                        routerLink: ['/private-messages']
                    }
                ]
            },
            {
                label: 'User Management',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'List',
                        icon: 'pi pi-fw pi-list',
                        routerLink: ['profile/list']
                    },
                    {
                        label: 'Settings',
                        icon: 'pi pi-fw pi-plus',
                        routerLink: ['/settings']
                    }
                ]
            }
        ];
    }
}
