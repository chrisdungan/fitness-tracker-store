import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { MessageService } from './../../core/message-service/message.service';
import { IsAuthMessage } from '../../core/message-service/messages/isauth.message';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuthSubs: Subscription;
  isAuth = false;

  constructor(private authService: AuthService, private msgService: MessageService) { }

  ngOnInit() {
/*     this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    }); */

    this.isAuthSubs = this.msgService.getMessageOf(IsAuthMessage).subscribe(
      (msg) => {
          this.isAuth = msg.isAuthorized;
      });
  }

  ngOnDestroy(): void {
    this.isAuthSubs.unsubscribe(); // deallocates and clears up memory...
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    this.authService.logout();
  }
}
