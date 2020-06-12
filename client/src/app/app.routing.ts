import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import {HomepageComponent} from './homepage/homepage.component';
import {SignupComponent} from './signup/signup.component';
import {SigninComponent} from './signin/signin.component';
import {ProfileComponent} from './profile/profile.component';
import {AuthGuard} from './shared/authGuard/auth.guard';

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'profile', canActivate:[AuthGuard], component: ProfileComponent},
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }