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
      <div>
        <FormattedMessage id="SectionTargetGroup.titleLineTwo" />
      </div>

      <div className={css.steps}>
        <div className={css.stepContainer}>
          <a
            href="https://get.gwexperiences.com/agent"
            style={{
              color: "white",
              textDecoration: "none"
            }}
          >
            <div className={css.step1}>
              <h2>
                <FormattedMessage id="SectionTargetGroup.part1Text" />
              </h2>
            </div>
          </a>
        </div>
        <div className={css.stepContainer}>
          <a
            href="https://get.gwexperiences.com/host"
            style={{ color: "white", textDecoration: "none" }}
          >
            <div className={css.step2}>
              <h2>
                <FormattedMessage id="SectionTargetGroup.part2Text" />
              </h2>
            </div>
          </a>
        </div>
        <div className={css.stepContainer}>
          <a
            href="https://get.gwexperiences.com/group"
            style={{ color: "white", textDecoration: "none" }}
          >
            <div className={css.step3}>
              <h2>
                <FormattedMessage id="SectionTargetGroup.part3Text" />
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
