import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { JwtToken } from '../../models/JwtToken.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit, OnDestroy {
  public jwtToken: JwtToken;
  public subscription: Subscription;

  constructor(private authservice: AuthService) { }

  ngOnInit(): void {
    this.subscription = this.authservice.jwtToken.subscribe((jwtToken: JwtToken) => {
      this.jwtToken = jwtToken;
    });
  }

  public logout(): void {
    this.authservice.logout();
  }

  ngOnDestroy() {
    if (this.subscription) {this.subscription.unsubscribe();}
  }

}
