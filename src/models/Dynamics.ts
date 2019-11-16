import { ValidationAttributes } from "constants/models/Validations";

export interface DynamicStringMap {
  [key: string]: string;
}

export interface DynamicFunctionMap {
  [key: string]: Function;
}

export interface DynamicNumberMap {
  [key: string]: number;
}

export interface DynamicBooleanMap {
  [key: string]: boolean;
}

export interface DynamicValidation {
  [key: string]: ValidationAttributes;
}
