import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import classNames from "classnames";
import css from "./SectionSocialImpact.css";

const SectionSocialImpact = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);
  const highLight = (
    <span className={css.highLight}>
      <FormattedMessage id="SectionSocialImpact.contentHighLight" />
    </span>
  );

  return (
    <div className={classes}>
      <div className={css.content}>
        <FormattedMessage id="SectionSocialImpact.content" values={{highLight}}/>
      </div>
    </div>
  );
};

SectionSocialImpact.defaultProps = {
  rootClassName: null,
  className: null
};

const { string } = PropTypes;

SectionSocialImpact.propTypes = {
  rootClassName: string,
  className: string
};

export default SectionSocialImpact;
