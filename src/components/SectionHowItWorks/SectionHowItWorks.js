import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import classNames from "classnames";

import css from "./SectionHowItWorks.css";

const SectionHowItWorks = props => {
  const { rootClassName, className, user } = props;

  const isNGO = user && user.attributes && user.attributes.profile.publicData && user.attributes.profile.publicData.provider;
  const isTA = user && !isNGO;

  const classes = classNames(rootClassName || css.root, className);
  return (
    <div className={classes}>
      <div className={css.title}>
        <FormattedMessage id="SectionHowItWorks.titleLineOne" />
      </div>

      <div className={css.steps}>
        <div className={css.step}>
          <h3 className={css.numberTitle}>1</h3>
          <h2 className={css.stepTitle}>
            <FormattedMessage id={ `SectionHowItWorks.part1Title${isNGO ? 'NGO' : isTA ? 'TA' : ''}`} values={{newline: (<br />)}}/>
          </h2>
          <p className={css.stepText}>
            <FormattedMessage id={`SectionHowItWorks.part1Text${isNGO ? 'NGO' : isTA ? 'TA' : ''}`} />
          </p>
        </div>

        <div className={css.step}>
          <h3 className={css.numberTitle}>2</h3>
          <h2 className={css.stepTitle}>
            <FormattedMessage id={`SectionHowItWorks.part2Title${isNGO ? 'NGO' : isTA ? 'TA' : ''}`} values={{newline: (<br />)}}/>
          </h2>
          <p className={css.stepText}>
            <FormattedMessage id={`SectionHowItWorks.part2Text${isNGO ? 'NGO' : isTA ? 'TA' : ''}`} />
          </p>
        </div>

        <div className={css.step}>
        <h3 className={css.numberTitle}>3</h3>
          <h2 className={css.stepTitle}>
            <FormattedMessage id={`SectionHowItWorks.part3Title${isNGO ? 'NGO' : isTA ? 'TA' : ''}`} values={{newline: (<br />)}}/>
          </h2>
          <p className={css.stepText}>
            <FormattedMessage id={`SectionHowItWorks.part3Text${isNGO ? 'NGO' : isTA ? 'TA' : ''}`} />
          </p>
        </div>

      </div>
      { isTA && <div className={css.videoContainer}>
        <div className={css.video}>
          <iframe className={css.video} src="https://www.youtube.com/embed/yCXCVTQx3pw?autoplay=1">
          </iframe>
        </div>
        <div className={css.video}>
          <iframe className={css.video} src="https://www.youtube.com/embed/C3d2XEHL090?autoplay=1">
          </iframe>
        </div>
      </div>}
    </div>
  );
};

SectionHowItWorks.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

SectionHowItWorks.propTypes = {
  rootClassName: string,
  className: string
};

export default SectionHowItWorks;
