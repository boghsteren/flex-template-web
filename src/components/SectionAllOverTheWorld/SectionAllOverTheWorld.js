import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import classNames from "classnames";

import { NamedLink } from "../../components";

import css from "./SectionAllOverTheWorld.css";
import southafricaImage from "./images/southafrica.jpg";
import brazilImage from "./images/brazil.jpg";
import usaImage from "./images/usa.jpg";

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
          id="SectionAllOverTheWorld.listingsInLocation"
          values={{ location: nameText }}
        />
      </div>
    </NamedLink>
  );
};

const SectionAllOverTheWorld = props => {
  const { rootClassName, className } = props;

  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <div className={css.title}>
        <FormattedMessage id="SectionAllOverTheWorld.title" />
      </div>
      <div className={css.paragraph}>
        <p>
          <FormattedMessage id="SectionAllOverTheWorld.subtitle" />
        </p>
      </div>
      <div className={css.locations}>
        {locationLink(
          "South Africa",
          southafricaImage,
          "?address=South%20Africa&bounds=-22.125537%2C32.997178%2C-34.93388%2C16.38247"
        )}
        {locationLink(
          "Brazil",
          brazilImage,
          "?address=Brazil&bounds=5.271602%2C-28.741975%2C-33.83191%2C-73.982498"
        )}
        {locationLink(
          "USA",
          usaImage,
          "?address=United%20States&bounds=71.540724%2C-64.464198%2C-14.6528%2C-179.9"
        )}
      </div>
    </div>
  );
};

SectionAllOverTheWorld.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

SectionAllOverTheWorld.propTypes = {
  rootClassName: string,
  className: string
};

export default SectionAllOverTheWorld;
