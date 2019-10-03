import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import classNames from "classnames";
import screenTrans from '../../assets/landingPage/global-goals.png';

import css from "./SectionHelpWorldBetter.css";

const SectionHelpWorldBetter = props => {
  const { rootClassName, className } = props;

  const classes = classNames(rootClassName || css.root, className);
  return (
    <div>
      <div className={css.title}>
        <FormattedMessage id="SectionHelpWorldBetter.titleLineOne" />
      </div>
      <div className={classes}>
        <div className={css.textContainer}>
          <div className={css.paragraph}>
            <FormattedMessage
              id="SectionHelpWorldBetter.paraPart1"
            />
            <strong>
              <FormattedMessage
                id="SectionHelpWorldBetter.paraPart2"
              />
            </strong>
            <FormattedMessage
              id="SectionHelpWorldBetter.paraPart3"
            />
          </div>
        </div>
        <div className={css.imageWrapper}>
          <img
            className={css.screenTrans}
            src={screenTrans}
          />
        </div>
      </div>
    </div>
  );
};

SectionHelpWorldBetter.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

SectionHelpWorldBetter.propTypes = {
  rootClassName: string,
  className: string
};

export default SectionHelpWorldBetter;
