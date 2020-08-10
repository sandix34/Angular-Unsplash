import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LayoutModule } from './layout.module';

// components
import { SignupComponent } from '../../components/signup/signup.component';
import { SigninComponent } from '../../components/signin/signin.component';
import { TopbarComponent } from '../../shared/components/topbar/topbar.component';

// services
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

// guards
import { AuthGuard } from '../authGuard/auth.guard';

// interceptors
import { AuthInterceptor } from '../interceptors/auth.interceptor';

const COMPONENTS = [
  TopbarComponent,
  SignupComponent,
  SigninComponent,
]

@NgModule({
  declarations: COMPONENTS,
  exports: COMPONENTS,
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthService,
    UserService,
    AuthGuard
  ],
  imports: [
    HttpClientModule,
    LayoutModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class CoreModule { }
