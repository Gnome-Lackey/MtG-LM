import * as React from "react";

import FormButton from "components/Form/Button";

import useFormData from "components/Hooks/useFormData";

import { PlayerDetails } from "models/Player";

import "./styles.scss";

interface PlayerFormProps {
  isRequestLoading: boolean;
  selectedPlayer: PlayerDetails;
  submitHandler: Function;
}

const PlayerForm = ({
  isRequestLoading,
  selectedPlayer,
  submitHandler
}: PlayerFormProps): React.FunctionComponentElement<PlayerFormProps> => {
  const { values, resetValues } = useFormData(null);

  const handleSubmit = (ev: React.FormEvent): void => {
    ev.preventDefault();

    if (selectedPlayer) {
      submitHandler(selectedPlayer.id, values);
    } else {
      submitHandler(values);
    }
  };

  React.useEffect(() => {
    resetValues(selectedPlayer);
  }, [selectedPlayer]);

  const isDisabled = isRequestLoading;

  return (
    <form className="player-form" onSubmit={handleSubmit}>
      <div className="player-detail-fields">
        <FormButton loading={isRequestLoading} type="submit" disabled={isDisabled}>
          Submit
        </FormButton>
      </div>
    </form>
  );
};

export default PlayerForm;
