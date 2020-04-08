import {
  ValidationMessages,
  ValidationPhone,
  ValidationRequired
} from "constants/models/Validations";


export const NO_SPACES_REGEX = /^\S*$/;

// https://stackoverflow.com/a/123666
export const PHONE_NUMBER_REGEX = /^[0-9]*$/;

// https://stackoverflow.com/a/201378/1925346 - The below is good enough for now.
export const EMAIL_REGEX = /^.*@.*\.[a-zA-Z]{2,3}$/;

export const VALIDATION_MESSAGES: ValidationMessages = {
  REQUIRED: "This field is required",
  NO_WHITESPACE: "Passwords are not allowed to have whitespace.",
  PHONE: "Must be a valid phone number",
  LENGTH: (count: number) => `Must not exceed ${count} character${count > 1 ? "s" : ""}.`
};

export const VALIDATION_PHONE: ValidationPhone = {
  match: {
    restriction: PHONE_NUMBER_REGEX,
    errorMessage: VALIDATION_MESSAGES.PHONE
  },
  maxLength: {
    restriction: 10,
    errorMessage: VALIDATION_MESSAGES.LENGTH(10)
  }
};

export const VALIDATION_PASSWORD: ValidationRequired = {
  required: {
    restriction: true,
    errorMessage: VALIDATION_MESSAGES.REQUIRED
  },
  match: {
    restriction: NO_SPACES_REGEX,
    errorMessage: VALIDATION_MESSAGES.NO_WHITESPACE
  }
};

export const VALIDATION_REQUIRED: ValidationRequired = {
  required: {
    restriction: true,
    errorMessage: VALIDATION_MESSAGES.REQUIRED
  }
};
