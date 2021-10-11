import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { MediaListComponent } from './media-list/media-list.component';
import { MediaCardComponent } from './media-card/media-card.component';
import { MediaDetailedComponent } from './media-detailed/media-detailed.component';
import { MediaEditComponent } from './media-edit/media-edit.component';
import { MediaAddComponent } from './media-add/media-add.component';
import { ScreeningComponent } from './screening/screening.component';



@NgModule({
  declarations: [
    MediaCardComponent,
    MediaListComponent,
    MediaDetailedComponent,
    MediaEditComponent,
    MediaAddComponent,
    ScreeningComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]

})
export class MediaModule { }
