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
    icon: "fas fa-hat-wizard",
    label: "Season Manager",
    route: ROUTES.SEASON_PAGE
  }
];
