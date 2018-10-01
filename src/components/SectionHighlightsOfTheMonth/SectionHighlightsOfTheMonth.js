import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import classNames from "classnames";

import { NamedLink } from "../../components";

import css from "./SectionHighlightsOfTheMonth.css";
import beachcleanupImage from "./images/beachcleanup.jpg";
import kiberaImage from "./images/kibera.jpg";
import adayonthefarmImage from "./images/adayonthefarm.jpg";

const locationLink = (name, image, slug, id) => {
  const nameText = <span className={css.locationName}>{name}</span>;
  return (
    <NamedLink
      name="ListingPage"
      params={{ slug: slug, id: id }}
      className={css.location}
    >
      <div className={css.imageWrapper}>
        <div className={css.aspectWrapper}>
          <img src={image} alt={name} className={css.locationImage} />
        </div>
      </div>
      <div className={css.linkText}>
        <FormattedMessage
          id="SectionAllOverTheWorld.listingsInLocation"
          values={{ location: nameText }}
        />
      </div>
    </NamedLink>
  );
};

const SectionHighlightsOfTheMonth = props => {
  const { rootClassName, className } = props;

  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <div className={css.title}>
        <FormattedMessage id="SectionHighlightsOfTheMonth.title" />
      </div>
      <div className={css.locations}>
        {locationLink(
          "Beach clean-up",
          beachcleanupImage,
          "beach-clean-up",
          "5baa35e6-82da-4e93-8d79-e11971136b73"
        )}
        {locationLink(
          "Tour of Kibera",
          kiberaImage,
          "kibera-tour",
          "5ba53ddd-bb2a-44cc-a91d-1122b6560d16"
        )}
        {locationLink(
          "A day on the farm",
          adayonthefarmImage,
          "a-day-on-the-farm",
          "5baa3547-0238-4cb8-b46d-b4e114da5dcf"
        )}
      </div>
    </div>
  );
};

SectionHighlightsOfTheMonth.defaultProps = {
  rootClassName: null,
  className: null
};

const { string } = PropTypes;

SectionHighlightsOfTheMonth.propTypes = {
  rootClassName: string,
  className: string
};

export default SectionHighlightsOfTheMonth;
