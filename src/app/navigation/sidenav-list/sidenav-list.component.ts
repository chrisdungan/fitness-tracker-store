import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { MessageService } from './../../core/message-service/message.service';
import { IsAuthMessage } from '../../core/message-service/messages/isauth.message';



@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output()closeSidenav = new EventEmitter<void>();
  authSubscription: Subscription;
  isAuthSubs: Subscription;
  isAuth = false;

  constructor(private authService: AuthService, private msgService: MessageService) { }

  ngOnInit() {
/*      this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    }); */

    this.isAuthSubs = this.msgService.getMessageOf(IsAuthMessage).subscribe(
      (msg) => {
        this.isAuth = msg.isAuthorized;
      });
  }

  ngOnDestroy(): void {
    // this.authSubscription.unsubscribe(); // deallocates and clears up memory...
    this.isAuthSubs.unsubscribe();
  }

  onLogout() {
    this.onClose();
    this.authService.logout();
  }

  onClose() {
    this.closeSidenav.emit();
  }
}
