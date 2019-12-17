import * as React from "react";

import {
  ConfirmFields,
  GettingStartedFields,
  LoginFields,
  SignUpFields,
  RecordMatchFields,
  SeasonFields,
} from "components/Hooks/useFormData/models/FormFields";

import {
  ConfirmFormData,
  GettingStartedFormData,
  LoginFormData,
  RecordMatchFormData,
  SignUpFormData,
  SeasonFormData
} from "components/Hooks/useFormData/models/FormData";

function useFormData(formFields: ConfirmFields): ConfirmFormData;
function useFormData(formFields: GettingStartedFields): GettingStartedFormData;
function useFormData(formFields: RecordMatchFields): RecordMatchFormData;
function useFormData(formFields: LoginFields): LoginFormData;
function useFormData(formFields: SignUpFields): SignUpFormData;
function useFormData(formFields: SeasonFields): SeasonFormData;

function useFormData(formFields: any): any {
  const [values, setValues] = React.useState(formFields);
  const [invalidations, setInvalidations] = React.useState({});
  const [isDirty, setIsDirty] = React.useState(false);

  React.useEffect(() => {
    const initialInvalidations = Object.keys(formFields).reduce(
      (invalidationsMap: object, key: string) => ({
        ...invalidationsMap,
        [key]: ""
      }),
      {}
    );

    return () => {
      setValues(formFields);
      setInvalidations(initialInvalidations);
    };
  }, []);

  return {
    values,
    invalidations,
    isDirty,
    resetValues: (newValues: object) => {
      setIsDirty(false);

      setValues(newValues);
    },
    updateValues: (id: string, value: string | string[]) => {
      setIsDirty(true);

      setValues({
        ...values,
        [id]: value
      });
    },
    updateInvalidations: (id: string, message: string) =>
      setInvalidations({
        ...invalidations,
        [id]: message
      })
  };
}

export default useFormData;
