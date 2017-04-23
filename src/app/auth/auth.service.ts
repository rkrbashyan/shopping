import * as CryptoJS from 'crypto-js';
import { Injectable } from "@angular/core";
import { LocalStorageService } from 'angular-2-local-storage';
import { Subject } from "rxjs/Subject";

interface User {
    status: string,
    email: string,
    loggedIn: boolean
}

@Injectable()
export class AuthService {

    currentUser: User = {
        status: 'unAuthorized',
        email: '',
        loggedIn: false
    };

    activeUser = new Subject<User>();

    constructor(private localStorageService: LocalStorageService) { };

    isUserExists(email: string) {
        const promise = new Promise(
            (resolve, reject) => {
                if (!this.localStorageService.get(email)) {
                    resolve('New User');
                } else {
                    reject('User with this email exists. Please, log in.');
                }
            }
        );
        return promise;
    }

    saveAndLoginUser(email: string, password: string) {
        let hash = CryptoJS.SHA256(password);
        let psw = hash.toString(CryptoJS.enc.Base64);
        this.localStorageService.set(email, psw);

        this.currentUser.status = 'Authorized User';
        this.currentUser.email = email;
        this.currentUser.loggedIn = true;

        this.activeUser.next(this.currentUser);
    }

    login(email: string, password: string) {
        const promise = new Promise(
            (resolve, reject) => {
                let hash = CryptoJS.SHA256(password);
                let pswToCheck = hash.toString(CryptoJS.enc.Base64);
                let pswInStorage = this.localStorageService.get(email);

                if (!pswInStorage) {
                    reject('We can not find an account with that email address. Please, sign up.');
                } else if (pswInStorage !== pswToCheck) {
                    reject('Your password is incorrect');
                } else {
                    this.currentUser.status = 'Authorized User';
                    this.currentUser.email = email;
                    this.currentUser.loggedIn = true;

                    this.activeUser.next(this.currentUser);
                    resolve('All good');
                }
            }
        );

        return promise;
    }

    logout() {
        this.currentUser.status = 'unAuthorized';
        this.currentUser.email = '';
        this.currentUser.loggedIn = false;
        this.activeUser.next(this.currentUser);
    }
}