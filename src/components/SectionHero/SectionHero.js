import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import classNames from "classnames";
import { Button, NamedLink } from "../../components";
import css from "./SectionHero.css";

const SectionHero = props => {
  const { rootClassName, className, currentUser } = props;
  const isTA = currentUser && !currentUser.attributes.profile.publicData.provider;
  const classes = classNames(rootClassName || css.root, className, isTA ? css.backgroundTA : css.background);

  return (
    <div
      className={classes}
    >
      <h1 className={ isTA ? css.heroMainTitleTA : css.heroMainTitle}>
        <FormattedMessage id={ isTA ? "SectionHero.titleTA" : "SectionHero.title"} />
      </h1>
      <h2 className={css.heroSubTitle}>
        <FormattedMessage id={ isTA ? "SectionHero.subTitleTA" : "SectionHero.subTitle"} />
      </h2>
      <NamedLink name="SearchPage" className={css.wrapperGetStarted}>
        <Button className={css.deskTopButton} >
          <FormattedMessage id={ isTA ? "SectionHero.buttonTA" : "SectionHero.button"} />
        </Button>
      </NamedLink>
    </div>
  );
};

SectionHero.defaultProps = { rootClassName: null, className: null };

const { string, shape, func } = PropTypes;

SectionHero.propTypes = {
  rootClassName: string,
  className: string,

  history: shape({
    push: func.isRequired
  }).isRequired,
  location: shape({
    search: string.isRequired
  }).isRequired
};

export default SectionHero;
