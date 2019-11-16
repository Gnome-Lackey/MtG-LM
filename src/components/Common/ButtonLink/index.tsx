import * as React from "react";

import "./styles.scss";

interface ButtonLinkProps {
  text: string;
  url: string;
}

const ButtonLink = ({
  text,
  url
}: ButtonLinkProps): React.FunctionComponentElement<ButtonLinkProps> => (
  <a className="btn-link" href={url}>
    {text}
  </a>
);

export default ButtonLink;
