import { Routes } from '@angular/router';

export const enum AppPaths {
  LOGIN = 'login',
  REGISTRATION = 'registration'
}

export const routes: Routes = [
  {
    path: AppPaths.LOGIN,
    loadComponent: () => import('~pages/login-page/login-page').then((module) => module.LoginPage),
  },
  {
    path: AppPaths.REGISTRATION,
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
