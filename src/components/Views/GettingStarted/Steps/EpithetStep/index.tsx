import * as React from "react";
import * as Chance from "chance";
import * as classNames from "classnames";

import { Card as CardModel } from "models/Card";
import { User } from "models/User";

import "./styles.scss";
import Epithet from "./Epithet";

const chance = new Chance();

interface EpithetStepProps {
  selectedEpithet: string;
  selectedCard: CardModel;
  updateValues: Function;
  user: User;
}

const buildEpithetClassNames = (
  currentEpithet: string,
  selectedEpithet: string,
  highlightedEpithet: string
): string => {
  const classes = [];

  const isNotHighlighted = highlightedEpithet && highlightedEpithet !== currentEpithet;
  const isNotSelected = selectedEpithet && selectedEpithet !== currentEpithet;

  if (!selectedEpithet && isNotHighlighted) {
    classes.push("dim");
  } else if (isNotSelected && isNotHighlighted) {
    classes.push("dim");
  } else if (!highlightedEpithet && isNotSelected) {
    classes.push("dim");
  }

  return classes.join(" ");
};

const EpithetStep = ({
  selectedEpithet,
  selectedCard,
  updateValues,
  user
}: EpithetStepProps): React.FunctionComponentElement<EpithetStepProps> => {
  const [highlightedEpithet, setHighlightedEpithet] = React.useState("");
  const [animal] = React.useState(chance.animal());

  const { name, type } = selectedCard;
  const firstName = user ? user.firstName : "";
  const lastName = user ? user.lastName : "";

  const cardNameEpithet = name.toLowerCase();
  const cardTypeEpithet = `the ${type.split(" — ")[1]}`.toLowerCase();
  const animalEpithet = `the ${animal} chaser`.toLowerCase();
  const randomEpithet = "[[random]]";

  const handleUpdate = (epithet: string): void => {
    updateValues("epithet", epithet);
  };

  return (
    <div className="epithet-step">
      <h3>Select an epithet:</h3>
      <ul className="epithet-list">
        <li>
          <Epithet
            handleUpdate={handleUpdate}
            handleHover={setHighlightedEpithet}
            epithet={cardNameEpithet}
            className={buildEpithetClassNames(cardNameEpithet, selectedEpithet, highlightedEpithet)}
          >
            {firstName}
            &nbsp;
            <span className="emphasis">{`"${cardNameEpithet}"`}</span>
            &nbsp;
            {lastName}
          </Epithet>
        </li>
        <li>
          <Epithet
            handleUpdate={handleUpdate}
            handleHover={setHighlightedEpithet}
            epithet={cardTypeEpithet}
            className={buildEpithetClassNames(cardTypeEpithet, selectedEpithet, highlightedEpithet)}
          >
            {firstName}
            &nbsp;
            <span className="emphasis">{`"${cardTypeEpithet}"`}</span>
            &nbsp;
            {lastName}
          </Epithet>
        </li>

        <li>
          <Epithet
            handleUpdate={handleUpdate}
            handleHover={setHighlightedEpithet}
            epithet={animalEpithet}
            className={buildEpithetClassNames(animalEpithet, selectedEpithet, highlightedEpithet)}
          >
            {firstName}
            &nbsp;
            <span className="emphasis">{`"${animalEpithet}"`}</span>
            &nbsp;
            {lastName}
          </Epithet>
        </li>
        <li>
          <Epithet
            handleUpdate={handleUpdate}
            handleHover={setHighlightedEpithet}
            epithet={randomEpithet}
            className={buildEpithetClassNames(randomEpithet, selectedEpithet, highlightedEpithet)}
          >
            I&apos;m &nbsp;
            <span className="emphasis">Zendikarian</span>, so I&apos;m feeling adventurous. Make it
            a surprise!
          </Epithet>
        </li>
      </ul>
      <p className={classNames("hint", { visible: selectedEpithet })}>
        {selectedEpithet === randomEpithet
          ? "Ho ho! A mighty Zandikarian. We shall see what great name fate blesses you with."
          : `The mighty name, ${firstName} "${selectedEpithet}" ${lastName}, shall echo throughout the halls of time. However, nothing is set in stone and if this name is not suitable it can always be changed.`}
      </p>
    </div>
  );
};

export default EpithetStep;
