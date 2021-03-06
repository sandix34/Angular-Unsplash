import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router'; // CLI imports router
import {SignupComponent} from './components/signup/signup.component';
import {SigninComponent} from './components/signin/signin.component';
import {AuthGuard} from './shared/authGuard/auth.guard';

const routes: Route[] = [
  {path: '', pathMatch: 'full', redirectTo: 'photos'},
  {
    path: 'photos',
    loadChildren: () => import('src/app/photos/photos.module').then(m => m.PhotosModule)
  },
  {path: 'signup', component: SignupComponent},
  {path: 'signin', component: SigninComponent},
  {
    path: 'profile',
    canActivate:[AuthGuard],
    loadChildren: () => import('src/app/profile/profile.module').then(m => m.ProfileModule)
  },
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }