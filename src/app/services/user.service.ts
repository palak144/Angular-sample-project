import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RegisterModel } from '../models/register.model';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<RegisterModel[]>(`${config.apiUrl}/users`);
    }

    register(user: RegisterModel) {
        
        return this.http.post(`${config.apiUrl}/users/register`, user);
    }

    delete(id: number) {
        return this.http.delete(`${config.apiUrl}/users/${id}`);
    }
}