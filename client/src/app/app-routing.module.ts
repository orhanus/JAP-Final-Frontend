import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { MediaAddComponent } from './features/media/media-add/media-add.component';
import { MediaDetailedComponent } from './features/media/media-detailed/media-detailed.component';
import { MediaEditComponent } from './features/media/media-edit/media-edit.component';
import { MediaListComponent } from './features/media/media-list/media-list.component';
import { NotFoundComponent } from './shared/errors/not-found/not-found.component';
import { ServerErrorComponent } from './shared/errors/server-error/server-error.component';

const routes: Routes = [
  {path: '', component: MediaListComponent},
  {path: 'media-detailed/:id', component: MediaDetailedComponent},
  {path: 'media-edit/:id', component: MediaEditComponent},
  {path: 'media-add', component: MediaAddComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'server-error', component: ServerErrorComponent},
  {path: '**', component: NotFoundComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
