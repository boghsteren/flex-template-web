import React from "react";
import PropTypes from "prop-types";
import LogoImage from "./favicon-32x32.png";

const IconLogo = props => {
  const { className } = props;

  return (
    <img className={className} alt={"Goodwings Experiences"} src={LogoImage} />
  );
};

const { string } = PropTypes;

IconLogo.defaultProps = {
  className: null
};

IconLogo.propTypes = {
  className: string
};

export default IconLogo;
