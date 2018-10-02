import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import classNames from "classnames";
import css from "./SectionHighlightsOfTheMonth.css";
import { ListingCard } from "../../components";


const SectionHighlightsOfTheMonth = props => {
  const { rootClassName, className, listings } = props;

  const classes = classNames(rootClassName || css.root, className);
  // Panel width relative to the viewport
  const panelMediumWidth = 50;
  const panelLargeWidth = 62.5;
  const cardRenderSizes = [
    "(max-width: 767px) 100vw",
    `(max-width: 1023px) ${panelMediumWidth}vw`,
    `(max-width: 1920px) ${panelLargeWidth / 2}vw`,
    `${panelLargeWidth / 3}vw`
  ].join(", ");

  return (
    <div className={classes}>
      <div className={css.title}>
        <FormattedMessage id="SectionHighlightsOfTheMonth.title" />
      </div>
      <div className={css.locations}>
      {listings.map(listing => (
        <ListingCard
          listing={listing}
          key={listing.id.uuid}
          renderSizes={cardRenderSizes}
          className={css.listingCard}
        />
      ))}</div>
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
