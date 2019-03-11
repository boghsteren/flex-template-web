import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import classNames from "classnames";
import screenTrans from '../../assets/landingPage/screen-trans.png';

import css from "./SectionWhatIsIt.css";

const SectionWhatIsIt = props => {
  const { rootClassName, className } = props;

  const classes = classNames(rootClassName || css.root, className);
  return (
    <div className={classes}>
      <div className={css.textContainer}>
        <div className={css.title}>
          <FormattedMessage id="SectionWhatIsIt.titleLineOne" />
        </div>
        <div className={css.paragraph}>
          <FormattedMessage 
            id="SectionWhatIsIt.paraPart1"
          />
          <strong>
            <FormattedMessage 
              id="SectionWhatIsIt.paraPart2"
            />
          </strong>
          <FormattedMessage 
            id="SectionWhatIsIt.paraPart3"
          />
        </div>
      </div>
      <div className={css.imageWrapper}>
        <img
          className={css.screenTrans}
          src={screenTrans}
        ></img>
      </div>
    </div>
  );
};

SectionWhatIsIt.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

SectionWhatIsIt.propTypes = {
  rootClassName: string,
  className: string
};

export default SectionWhatIsIt;
