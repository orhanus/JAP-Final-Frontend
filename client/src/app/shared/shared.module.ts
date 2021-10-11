import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EllipsisModule } from 'ngx-ellipsis';
import { RatingModule } from 'ngx-bootstrap/rating';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TitleComponent } from './title/title.component';
import { ToastrModule } from 'ngx-toastr';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { AppRoutingModule } from '../app-routing.module';
import { TextInputComponent } from './input/text-input/text-input.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';



@NgModule({
  declarations: [
    TitleComponent,
    NotFoundComponent,
    ServerErrorComponent,
    TextInputComponent
  ],
  imports: [
    CommonModule,
    EllipsisModule,
    RatingModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    TabsModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    AppRoutingModule,
    BrowserAnimationsModule,
    BsDatepickerModule
  ],
  exports: [
    FormsModule,
    RatingModule,
    EllipsisModule,
    TabsModule,
    ToastrModule,
    TitleComponent,
    NotFoundComponent,
    ServerErrorComponent,
    ReactiveFormsModule,
    CommonModule,
    AppRoutingModule,
    TextInputComponent,
    BrowserAnimationsModule,
    BsDatepickerModule
  ]
})
export class SharedModule { }
