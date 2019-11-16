import * as React from "react";

import "./styles.scss";

const FULL_YEAR = new Date().getFullYear();

const Footer = (): React.FunctionComponentElement<void> => (
  <div className="app-footer">
    <p className="copyright">&copy;{FULL_YEAR} Gnome Lackey. All rights reserved.</p>
  </div>
);

export default Footer;
