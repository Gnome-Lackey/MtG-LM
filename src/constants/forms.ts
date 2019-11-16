import { DynamicFunctionMap } from "models/Dynamics";

export const VALIDATION_MAP: DynamicFunctionMap = {
  match: (value: string, restriction: RegExp) => !!value.match(restriction),
  maxLength: (value: string, restriction: number) => value.length <= restriction,
  minLength: (value: string, restriction: number) => value.length >= restriction,
  required: (value: string) => !!value
};
