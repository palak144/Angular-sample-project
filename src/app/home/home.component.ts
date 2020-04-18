import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { RegisterModel } from '../models/register.model';
import { UserService} from '../services/user.service';
import { AuthService} from '../services/auth.service';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
    currentUser: RegisterModel;
    users = [];

    constructor(
        private authenticationService: AuthService,
        private userService: UserService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    deleteUser(id: number) {
        this.userService.delete(id)
            .pipe(first())
            .subscribe(() => this.loadAllUsers());
    }

    private loadAllUsers() {
        this.userService.getAll()
            .pipe(first())
            .subscribe(users => this.users = users);
    }
}