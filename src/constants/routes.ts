import { Routes } from "constants/models/Routes";

export const ROUTES: Routes = {
  ROOT: "/",
  HOME_PAGE: "/home",
  GETTING_STARTED: "/getting_started",
  SIGN_UP_PAGE: "/signup",
  VERIFICATION_PAGE: "/verify"
};

export const LOGGED_IN_ROUTES: string[] = [ROUTES.HOME_PAGE];
