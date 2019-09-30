import React, { Component } from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import classNames from "classnames";
import css from "./SectionExample.css";
import { ListingCard } from "../../components";

class SectionExample extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { rootClassName, className, listings } = this.props;
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

    const newListing = listings.filter((listing, index) => {
      return index < 3;
    });

    return (
      <div className={classes} key="somekey">
        <div className={css.title}>
          <FormattedMessage id="SectionExample.title" />
        </div>
        <div className={css.locations}>
          {newListing.map(listing => (
            <ListingCard
              isLongCard={true}
              listing={listing}
              key={listing.id.uuid}
              renderSizes={cardRenderSizes}
              className={css.listingCard}
            />
          ))}
        </div>
      </div>
    );
  }
}

SectionExample.defaultProps = {
  rootClassName: null,
  className: null
};

const { string } = PropTypes;

SectionExample.propTypes = {
  rootClassName: string,
  className: string
};

export default SectionExample;
