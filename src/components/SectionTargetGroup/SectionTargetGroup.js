import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import classNames from "classnames";

import css from "./SectionTargetGroup.css";

const SectionTargetGroup = props => {
  const { rootClassName, className } = props;

  const classes = classNames(rootClassName || css.root, className);
  return (
    <div className={classes}>
      <div className={css.title}>
        <FormattedMessage id="SectionTargetGroup.titleLineOne" />
      </div>
      <div className={css.titleLineTwo}>
        <FormattedMessage id="SectionTargetGroup.titleLineTwo" />
      </div>

      <div className={css.steps}>
        <div className={classNames(css.stepContainer, css.step1Background)}>
          <a
            href="https://get.gwexperiences.com/agent"
          >
            <div className={css.step}>
              <h2>
                <FormattedMessage id="SectionTargetGroup.part1Text" />
              </h2>
            </div>
          </a>
        </div>
        <div className={classNames(css.stepContainer, css.step2Background)}>
          <a
            href="https://get.gwexperiences.com/host"
          >
            <div className={css.step}>
              <h2>
                <FormattedMessage id="SectionTargetGroup.part2Text" />
              </h2>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

SectionTargetGroup.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

SectionTargetGroup.propTypes = {
  rootClassName: string,
  className: string
};

export default SectionTargetGroup;
