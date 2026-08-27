import { Routes } from '@angular/router';

export const enum AppPaths {
  LOGIN = 'login',
  REGISTRATION = 'registration',
  GAMES_LIST = 'games-list',
  GAME_ROOM = 'game'
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
    path: AppPaths.GAMES_LIST,
    loadComponent: () =>
      import('~pages/games-list-page/games-list-page').then((module) => module.GamesListPage),
  },
    {
    path: AppPaths.GAME_ROOM,
    loadComponent: () =>
      import('~pages/game-room-page/game-room-page').then((module) => module.GameRoomPage),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
