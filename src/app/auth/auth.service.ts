import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

import { AuthData } from './auth-data.model';

import { TrainingService } from '../training/training.service';
import { MessageService } from '../core/message-service/message.service';
import { IsAuthMessage } from '../core/message-service/messages/isauth.message';
import { UIService } from '../shared/ui.service';



@Injectable()
export class AuthService {
    // authChange = new Subject<boolean>();

    private isAuthenticated = false;

    constructor(
        private router: Router,
        private afAuth: AngularFireAuth,
        private trainingService: TrainingService,
        private msgService: MessageService,
        private uiService: UIService
    ) { }


    initAuthListener() {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                console.log('current user is now logged-in');
                this.isAuthenticated = true;
                // this.authChange.next(true);
                this.msgService.publish(new IsAuthMessage(true));
                this.router.navigate(['/training']);
            } else {
                console.log('current user is now logged-out');
                this.trainingService.cancelSubscriptions();
                // this.authChange.next(false);
                this.msgService.publish(new IsAuthMessage(false));
                this.router.navigate(['/']);
                this.isAuthenticated = false;
            }
        });
    }

    registerUser(authData: AuthData) {
        this.afAuth.auth
            .createUserWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
                console.log(result);
            })
            .catch(error => {
                console.log(error);
            });
    }

    login(authData: AuthData) {
        this.afAuth.auth
            .signInWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
                console.log(result);
            })
            .catch(error => {
                console.log(error);
                this.uiService.showSnackbar('Please try again, email or password error!', null, 3000);
            });
    }

    logout() {
        this.afAuth.auth.signOut();
    }

    isAuth() {
        return this.isAuthenticated;
    }

}
