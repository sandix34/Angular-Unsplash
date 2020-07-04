import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'
import { LayoutModule } from '../shared/modules/layout.module';

import { PROFILE_ROUTES } from './profile.routes';
import { ProfileComponent } from './profile.component';



@NgModule({
  declarations: [
    ProfileComponent,
  ],
  imports: [
    LayoutModule,
    RouterModule.forChild(PROFILE_ROUTES)
  ]
})
export class ProfileModule { }
