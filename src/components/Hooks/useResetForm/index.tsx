import * as React from "react";

const FIELD_MAPPING: { [key: string]: any } = {};

function resetValues(domain: string, data: any): object {
  return FIELD_MAPPING[domain](data);
}

function useResetForm(domain: any, trigger: any, resetHandler: Function): void {
  React.useEffect(() => {
    resetHandler(resetValues(domain, trigger));
  }, [trigger]);
}

export default useResetForm;
