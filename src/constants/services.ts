import { DynamicStringMap } from "models/Dynamics";

const environment: string = process.env.ENV;

/*
  Auth API
*/

const authUrlMap: DynamicStringMap = {
  dev: "https://9l387zvofh.execute-api.us-east-1.amazonaws.com/dev/auth"
};

const AUTH_BASE_URL: string = authUrlMap[environment];

export const AUTH_LOGIN = `${AUTH_BASE_URL}/login`;
export const AUTH_LOGOUT = `${AUTH_BASE_URL}/logout`;
export const AUTH_CONFIRM = `${AUTH_BASE_URL}/confirm`;
export const AUTH_RESEND_CODE = `${AUTH_BASE_URL}/resend_code`;
export const AUTH_SIGN_UP = `${AUTH_BASE_URL}/signup`;
export const AUTH_VALIDATE = `${AUTH_BASE_URL}/validate`;

/*
  Player API
*/

const playerUrlMap: DynamicStringMap = {
  dev: "https://5u60j5v8n1.execute-api.us-east-1.amazonaws.com/dev/players"
};

export const PLAYER_BASE_URL: string = playerUrlMap[environment];

/*
  Scryfall API
*/

const SCRYFALL_BASE = "https://api.scryfall.com";

export const SCRYFALL_RANDOM_CARD = `${SCRYFALL_BASE}/cards/random`;
