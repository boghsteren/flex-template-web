import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import classNames from "classnames";
import bookImage from "./book.png";
import interactImage from "./interact.png";
import searchImage from "./search.png";

import css from "./SectionHowItWorks.css";

const SectionHowItWorks = props => {
  const { rootClassName, className } = props;

  const classes = classNames(rootClassName || css.root, className);
  return (
    <div className={classes}>
      <div className={css.title}>
        <FormattedMessage id="SectionHowItWorks.titleLineOne" />
      </div>

      <div className={css.steps}>
        <div className={css.step}>
          <div className={css.imageWrapper}>
            <div className={css.aspectWrapper}>
              <img
                src={searchImage}
                alt={"Search"}
                className={css.howItWorksImage}
              />
            </div>
          </div>
          <h2 className={css.stepTitle}>
            <FormattedMessage id="SectionHowItWorks.part1Title" />
          </h2>
          <p>
            <FormattedMessage id="SectionHowItWorks.part1Text" />
          </p>
        </div>

        <div className={css.step}>
          <div className={css.imageWrapper}>
            <div className={css.aspectWrapper}>
              <img
                src={interactImage}
                alt={"Interact"}
                className={css.howItWorksImage}
              />
            </div>
          </div>
          <h2 className={css.stepTitle}>
            <FormattedMessage id="SectionHowItWorks.part2Title" />
          </h2>
          <p>
            <FormattedMessage id="SectionHowItWorks.part2Text" />
          </p>
        </div>

        <div className={css.step}>
          <div>
            <div className={css.imageWrapper}>
              <div className={css.aspectWrapper}>
                <img
                  src={bookImage}
                  alt={"Book"}
                  className={css.howItWorksImage}
                />
              </div>
            </div>
          </div>
          <h2 className={css.stepTitle}>
            <FormattedMessage id="SectionHowItWorks.part3Title" />
          </h2>
          <p>
            <FormattedMessage id="SectionHowItWorks.part3Text" />
          </p>
        </div>
      </div>
      <a href="https://get.gwexperiences.com/agent" className={css.location}>
        <div className={css.linkText}>
          <p>
            <FormattedMessage
              id="SectionHowItWorks.agentSignupLink"
              className={css.linkText}
            />
          </p>
        </div>
      </a>
     <a href="https://get.gwexperiences.com/host" className={css.location}>
        <div className={css.linkText}>
          <p>
            <FormattedMessage
              id="SectionHowItWorks.providerSignupLink"
              className={css.linkText}
            />
          </p>
        </div>
      </a>
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
