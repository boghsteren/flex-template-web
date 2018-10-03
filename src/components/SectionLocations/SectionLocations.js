import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import classNames from "classnames";

import { NamedLink } from "../../components";

import css from "./SectionLocations.css";

import teambuildingImage from "./images/teambuild.jpg";
import studytripsImage from "./images/study.jpg";
import givebackImage from "./images/giveback.jpg";

const locationLink = (name, image, searchQuery) => {
  const nameText = <span className={css.locationName}>{name}</span>;
  return (
    <NamedLink
      name="SearchPage"
      to={{ search: searchQuery }}
      className={css.location}
    >
      <div className={css.imageWrapper}>
        <div className={css.aspectWrapper}>
          <img src={image} alt={name} className={css.locationImage} />
        </div>
      </div>
      <div className={css.linkText}>
        <FormattedMessage
          id="SectionLocations.listingsInLocation"
          values={{ location: nameText }}
        />
      </div>
    </NamedLink>
  );
};

const SectionLocations = props => {
  const { rootClassName, className } = props;

  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <div className={css.title}>
        <FormattedMessage id="SectionLocations.title" />
      </div>
      <div className={css.locations}>
        {locationLink(
          "Team building",
          teambuildingImage,
          "?pub_category=team_building"
        )}
        {locationLink(
          "Study trips",
          studytripsImage,
          "?pub_category=study_trip"
        )}
        {locationLink(
          "Giving back",
          givebackImage,
          "?pub_category=giving_back"
        )}
      </div>
      <NamedLink name="SearchPage" className={css.linkText}>
        <div className={css.linkText}>
          <p>
            <FormattedMessage
              id="SectionLocations.generalLink"
              className={css.linkText}
            />
          </p>
        </div>
      </NamedLink>
    </div>
  );
};

SectionLocations.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

SectionLocations.propTypes = {
  rootClassName: string,
  className: string
};

export default SectionLocations;
