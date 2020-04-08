import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import {
  hasCustomClaim,
  redirectUnauthorizedTo,
  redirectLoggedInTo,
  AngularFireAuthGuard,
} from '@angular/fire/auth-guard';
import { RegisterComponent } from './pages/login/register/register.component';
import { HomeComponent } from './pages/home/home.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  {
    path: 'welcome',
    component: HomeComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
