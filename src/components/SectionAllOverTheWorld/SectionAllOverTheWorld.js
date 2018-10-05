import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import classNames from "classnames";

import { NamedLink } from "../../components";

import css from "./SectionAllOverTheWorld.css";
import southafricaImage from "./images/southafrica.jpg";
import brazilImage from "./images/brazil.jpg";
import europeImage from "./images/berlin.jpg";

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
      <div className={css.locations}>
        {locationLink(
          "Africa",
          southafricaImage,
          "?&bounds=40.35265004%2C51.7534497%2C-41.60124262%2C-21.70750553"
        )}
        {locationLink(
          "South America",
          brazilImage,
          "?&bounds=12.37611048%2C-38.69421601%2C-46.31822037%2C-91.63398809"
        )}
        {locationLink(
          "Europe",
          europeImage,
          "?&bounds=72.12446531%2C48.18413823%2C21.56588484%2C-20.2903369"
        )}
      </div>
      <NamedLink name="SearchPage" className={css.linkText}>
        <div className={css.linkText}>
          <p>
            <FormattedMessage
              id="SectionAllOverTheWorld.generalLink"
              className={css.linkText}
            />
          </p>
        </div>
      </NamedLink>
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
