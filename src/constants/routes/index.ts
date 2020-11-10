const HOME: string = "/";
const DASHBOARD: string = "/account/dashboard";
const CARDS: string = "/account/cards";
const SUBSCRIPTION: string = "/account/subscription";
const LOGIN: string = "/login";
const REGISTER: string = "/register";
const RESTAURANT: string = "/restaurant";
const CHECK_IN: string = `${RESTAURANT}/:id/checkin`;
const MENU_CARD: string = `${RESTAURANT}/:id/menu/:id`;
const SCANNER: string = "/scanner";

export {
  HOME,
  DASHBOARD,
  CHECK_IN,
  MENU_CARD,
  LOGIN,
  REGISTER,
  CARDS,
  SUBSCRIPTION,
  RESTAURANT,
  SCANNER,
};
