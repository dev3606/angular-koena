import { Injectable } from '@angular/core';
import { SERVER_URL } from '@app/contants';
import { User } from '@app/models/user';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(
        private http: HttpClient
    ){}

    login(username: string, password: string):any {
        return new Promise((resolve, reject) => {
            this.http.post<User>(SERVER_URL + 'auth/login', { email: username, password:password }).subscribe({
                next: (data) => resolve(data),
                error: (error) => reject(error)
            })
        })
    }

    getUserList(id:number) : any {
        return new Promise((resolve, reject) => {
            let url = '';
            let headers = new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization':  `Bearer ${localStorage.getItem('me-token')}`});
            let options = { headers: headers };
            if( id > 0)
                url = SERVER_URL + 'auth/' + id;
            else
                url = SERVER_URL + 'auth';
            this.http.get<User>(url, options).subscribe({
                next: (data) => resolve(data),
                error: (error) => reject(error)
            })
        })
    }
}