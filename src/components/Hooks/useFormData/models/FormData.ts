import {
  ConfirmFields,
  GettingStartedFields,
  LoginFields,
  RecordMatchFields,
  SignUpFields,
  SetFields
} from "components/Hooks/useFormData/models/FormFields";

export interface FormData {
  isDirty: boolean;
  resetValues: (values: object) => void;
  updateValues: (id: string, value: any) => void;
  updateInvalidations: (id: string, message: string) => void;
}

export interface ConfirmFormData extends FormData {
  values: ConfirmFields;
  invalidations: ConfirmFields;
}

export interface GettingStartedFormData extends FormData {
  values: GettingStartedFields;
  invalidations: GettingStartedFields;
}

export interface LoginFormData extends FormData {
  values: LoginFields;
  invalidations: LoginFields;
}

export interface RecordMatchFormData extends FormData {
  values: RecordMatchFields;
  invalidations: RecordMatchFields;
}

export interface SetFormData extends FormData {
  values: SetFields;
  invalidations: SetFields;
}

export interface SignUpFormData extends FormData {
  values: SignUpFields;
  invalidations: SignUpFields;
}
