import { ROUTES } from "./routes";

export const APP_MENU_ITEMS: { icon: string; label: string; route: string }[] = [
  {
    icon: "fas fa-home",
    label: "Home",
    route: ROUTES.HOME_PAGE
  }
];

export const ADMIN_APP_MENU_ITEMS: { icon: string; label: string; route: string }[] = [
  {
    icon: "fas fa-code-branch",
    label: "Season Manager",
    route: ROUTES.SEASON_MANAGER_PAGE
  },
  {
    icon: "fas fa-user-lock",
    label: "Role Manager",
    route: ROUTES.ROLE_MANAGER_PAGE
  }
];
