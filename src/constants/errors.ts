import { DynamicStringMap } from "models/Dynamics";

export const SERVICE_ERRORS: DynamicStringMap = {
  NO_RESPONSE: "The server is not responding, please try again later."
};

export const CODE_ERROR_UNAUTHORIZED = 401;
export const CODE_ERROR_FORBIDDEN = 403;
export const CODE_ERROR_NOT_FOUND = 404;
export const CODE_ERROR_INTERNAL_ERROR = 500;

export const TYPE_ERROR_ALIAS_EXISTS_EXCEPTION = "aliasExists";
export const TYPE_ERROR_ACCOUNT_CONFLICT_EXCEPTION = "accountConflict";
export const TYPE_ERROR_MISSING_TOKEN_EXCEPTION = "missingToken";
export const TYPE_ERROR_INVALID_TOKEN_EXCEPTION = "invalidToken";
export const TYPE_ERROR_INVALID_CONFIRMATION_CODE = "invalidConfirmationCode";
export const TYPE_ERROR_EXPIRED_CONFIRMATION_CODE = "expiredConfirmationCode";
export const TYPE_ERROR_INVALID_PASSWORD = "invalidCredentials";
export const TYPE_ERROR_MISSING_REQUIRED_ATTRIBUTE = "badRequest";
export const TYPE_ERROR_UNAUTHORIZED = "unauthorized";
export const TYPE_ERROR_USER_EXISTS = "collision";
export const TYPE_ERROR_USER_NOT_CONFIRMED = "unconfirmed";
export const TYPE_ERROR_NOT_FOUND = "notFound";
export const TYPE_ERROR_INTERNAL_ERROR = "internalError";

export const DOMAIN_ERROR_AUTH = "DOMAIN_ERROR_AUTH";
export const DOMAIN_ERROR_FORM_GETTING_STARTED = "DOMAIN_ERROR_FORM_GETTING_STARTED";
export const DOMAIN_ERROR_FORM_RECORD_MATCH = "DOMAIN_ERROR_FORM_RECORD_MATCH";
export const DOMAIN_ERROR_FORM_SEASON = "DOMAIN_ERROR_FORM_SEASON";
export const DOMAIN_ERROR_GENERAL = "DOMAIN_ERROR_GENERAL";

export const VIEW_ERROR_FORM_LOGIN = "VIEW_ERROR_FORM_LOGIN";
export const VIEW_ERROR_FORM_SIGN_UP = "VIEW_ERROR_FORM_SIGN_UP";
export const VIEW_ERROR_FORM_LOGOUT = "VIEW_ERROR_FORM_LOGOUT";
export const VIEW_ERROR_FORM_VERIFY = "VIEW_ERROR_FORM_VERIFY";
export const VIEW_ERROR_FORM_GETTING_STARTED = "VIEW_ERROR_FORM_GETTING_STARTED";
export const VIEW_ERROR_FORM_MATCH = "VIEW_ERROR_FORM_MATCH";
export const VIEW_ERROR_FORM_SEASON = "VIEW_ERROR_FORM_SEASON";
export const VIEW_ERROR_GENERAL = "VIEW_ERROR_GENERAL";
