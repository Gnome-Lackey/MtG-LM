import { DynamicValidation } from "models/Dynamics";

export interface ValidationAttributes {
  restriction: number | boolean | RegExp;
  errorMessage: string;
}

type ValidationLength = (count: number) => string;

export interface ValidationMessages {
  REQUIRED: string;
  PHONE: string;
  NO_WHITESPACE: string;
  LENGTH: ValidationLength;
}

export interface ValidationPhone extends DynamicValidation {
  match: ValidationAttributes;
  maxLength: ValidationAttributes;
}

export interface ValidationRequired extends DynamicValidation {
  required: ValidationAttributes;
}
