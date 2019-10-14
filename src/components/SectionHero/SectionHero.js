import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import classNames from "classnames";
import { Button, NamedLink } from "../../components";
import css from "./SectionHero.css";

const SectionHero = props => {
  const { rootClassName, className, currentUser } = props;
  const isTA = currentUser && !currentUser.attributes.profile.publicData.provider;
  const classes = classNames(rootClassName || css.root, className, css.background);
  const highLight = <span className={css.highLight}><FormattedMessage id="SectionHero.subTitleHighLightTA"/></span>;

  return (
    <div
      className={classes}
    >
      <h1 className={ isTA ? css.heroMainTitleTA : css.heroMainTitle}>
        <FormattedMessage id={ isTA ? "SectionHero.titleTA" : "SectionHero.title"} values={{newline: (<br />)}}/>
      </h1>
      <h2 className={css.heroSubTitle}>
        {isTA &&
          <FormattedMessage id="SectionHero.subTitleTA" values={{ highLight }}/>
        }
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
