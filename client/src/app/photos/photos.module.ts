import { NgModule } from '@angular/core';
import { PhotosComponent } from './photos.component';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '../shared/modules/layout.module';
import { PHOTOS_ROUTES } from './photos.routes';
import { PhotosService } from './shared/services/photos.service';



@NgModule({
  declarations: [PhotosComponent],
  imports: [
    LayoutModule,
    RouterModule.forChild(PHOTOS_ROUTES),
  ],
  providers: [PhotosService]
})
export class PhotosModule { }
