import { DynamicValidation } from "models/Dynamics";

import { VALIDATION_MAP } from "constants/forms";

export default class FormUtility {
  handleValidation(value: string, validations: DynamicValidation): string {
    const failedValidationKey = Object.keys(validations).find((validationType) => {
      const validationFunction = VALIDATION_MAP[validationType];
      const { restriction } = validations[validationType];

      return !validationFunction(value, restriction);
    });

    return failedValidationKey ? validations[failedValidationKey].errorMessage : "";
  }
}
