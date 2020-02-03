import { Routes } from "constants/models/Routes";

export const ROUTES: Routes = {
  ROOT: "/",
  HOME_PAGE: "/home",
  GETTING_STARTED: "/getting_started",
  SEASON_MANAGER_PAGE: "/manager/season",
  ROLE_MANAGER_PAGE: "/manager/role",
  SIGN_UP_PAGE: "/signup",
  VERIFICATION_PAGE: "/verify"
};

export const ADMIN_ROUTES: string[] = [ROUTES.SEASON_MANAGER_PAGE, ROUTES.ROLE_MANAGER_PAGE];
export const USER_ROUTES: string[] = [ROUTES.HOME_PAGE, ROUTES.GETTING_STARTED];
export const CONTAINER_ROUTES: string[] = [...ADMIN_ROUTES, ROUTES.HOME_PAGE];
