import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('~pages/login-page/login-page').then((module) => module.LoginPage),
  },
  {
    path: 'registration',
    loadComponent: () =>
      import('~pages/registration-page/registration-page').then(
        (module) => module.RegistrationPage,
      ),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
