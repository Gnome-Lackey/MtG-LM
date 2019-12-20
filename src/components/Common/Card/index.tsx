import * as React from "react";
import * as classNames from "classnames";

import { Card } from "models/Scryfall";

import "./styles.scss";

interface CardProps {
  card: Card;
  className?: string;
  handleHover?: Function;
  handleClick?: Function;
}

const Card = ({
  card,
  className,
  handleHover,
  handleClick
}: CardProps): React.FunctionComponentElement<CardProps> => (
  <div className="card">
    <button className="btn-image" type="button" onClick={() => handleClick(card)}>
      <img
        className={classNames("image", className)}
        src={card.image}
        alt={card.name}
        onMouseEnter={() => handleHover(card)}
        onMouseLeave={() => handleHover(null)}
      />
    </button>
  </div>
);

export default Card;
