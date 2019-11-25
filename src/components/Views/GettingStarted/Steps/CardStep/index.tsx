import * as React from "react";
import * as classNames from "classnames";

import Card from "components/Common/Card";

import { Card as CardModel } from "models/Card";

import { SPIRIT_ANIMAL_SAYINGS } from "constants/gettingStarted";

import "./styles.scss";

interface CardStepProps {
  cards: CardModel[];
  selectedCard: CardModel;
  updateValues: Function;
}

const buildClassName = (
  currentCard: CardModel,
  selectedCard: CardModel,
  highlightedCardName: string
): string => {
  const isNotHighlighted = highlightedCardName && highlightedCardName !== currentCard.name;
  const isNotSelected = selectedCard && selectedCard.name !== currentCard.name;

  if (!selectedCard && isNotHighlighted) {
    return "dim";
  } else if (isNotSelected && isNotHighlighted) {
    return "dim";
  } else if (!highlightedCardName && isNotSelected) {
    return "dim";
  }

  return "";
};

const CardStep = ({
  cards,
  selectedCard,
  updateValues
}: CardStepProps): React.FunctionComponentElement<CardStepProps> => {
  const [highlightedCardName, setHighlightedCardName] = React.useState("");
  const [phraseBuilder] = React.useState(
    SPIRIT_ANIMAL_SAYINGS[Math.floor(Math.random() * (SPIRIT_ANIMAL_SAYINGS.length - 1))]
  );

  return (
    <div className="card-step">
      <h3 className="title">What is your spirit animal?</h3>
      <ul className="card-list">
        {cards.map((nextCard) => (
          <li key={nextCard.id}>
            <Card
              card={nextCard}
              className={buildClassName(nextCard, selectedCard, highlightedCardName)}
              handleHover={(card: CardModel) => setHighlightedCardName(card ? card.name : "")}
              handleClick={(card: CardModel) => {
                updateValues("favoriteCard", card);
              }}
            />
          </li>
        ))}
      </ul>
      <p className={classNames("hint", { visible: selectedCard })}>
        {selectedCard ? phraseBuilder(selectedCard.name) : null}
      </p>
    </div>
  );
};

export default CardStep;
