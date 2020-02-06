import { DynamicStringMap } from "models/Dynamics";

const environment: string = process.env.ENV;

/*
  Auth API
*/

const authUrlMap: DynamicStringMap = {
  local: "http://localhost:9001/local/auth",
  dev: "https://7veqmte8wc.execute-api.us-east-1.amazonaws.com/dev/auth",
  qa: "https://wm2farj3t2.execute-api.us-east-1.amazonaws.com/qa/auth"
};

const AUTH_BASE_URL: string = authUrlMap[environment];

export const AUTH_LOGIN = `${AUTH_BASE_URL}/login`;
export const AUTH_LOGOUT = `${AUTH_BASE_URL}/logout`;
export const AUTH_CONFIRM = `${AUTH_BASE_URL}/confirm`;
export const AUTH_RESEND_CODE = `${AUTH_BASE_URL}/resend_code`;
export const AUTH_SIGN_UP = `${AUTH_BASE_URL}/signup`;
export const AUTH_VALIDATE = `${AUTH_BASE_URL}/validate`;

/*
  Match API
*/

const matchUrlMap: DynamicStringMap = {
  local: "http://localhost:9001/local/matches",
  dev: "https://3k5onoxjxk.execute-api.us-east-1.amazonaws.com/dev/matches",
  qa: "https://vu62zw4lj6.execute-api.us-east-1.amazonaws.com/qa/matches"
};

export const MATCH_BASE_URL: string = matchUrlMap[environment];

/*
  Player API
*/

const playerUrlMap: DynamicStringMap = {
  local: "http://localhost:9001/local/players",
  dev: "https://4mbtf9c63i.execute-api.us-east-1.amazonaws.com/dev/players",
  qa: "https://zs66h3djm8.execute-api.us-east-1.amazonaws.com/qa/players"
};

export const PLAYER_BASE_URL: string = playerUrlMap[environment];

/*
  Scryfall API
*/

const scryfallUrlMap: DynamicStringMap = {
  local: "http://localhost:9001/local",
  dev: "https://vfhqovqprh.execute-api.us-east-1.amazonaws.com/dev",
  qa: "https://fvgfu582w6.execute-api.us-east-1.amazonaws.com/qa"
};

export const SCRYFALL_BASE: string = scryfallUrlMap[environment];

export const SCRYFALL_CARDS = `${SCRYFALL_BASE}/cards`;
export const SCRYFALL_RANDOM_CARD = `${SCRYFALL_BASE}/cards/random`;
export const SCRYFALL_SETS = `${SCRYFALL_BASE}/sets`;

/*
  Season API
*/

const seasonUrlMap: DynamicStringMap = {
  local: "http://localhost:9001/local/seasons",
  dev: "https://n3tf249cqf.execute-api.us-east-1.amazonaws.com/dev/seasons",
  qa: "https://mvd9vvkebg.execute-api.us-east-1.amazonaws.com/qa/seasons"
};

export const SEASON_BASE_URL: string = seasonUrlMap[environment];

export const SEASON_GET_DETAILS = `${SEASON_BASE_URL}/details`;
export const SEASON_GET_CURRENT_DETAILS = `${SEASON_BASE_URL}/details/current`;
