import React from "react";
import { string, func } from "prop-types";
import { FormattedMessage, intlShape, injectIntl } from "react-intl";
import classNames from "classnames";
import { NamedLink, ResponsiveImage } from "../../components";
import { propTypes } from "../../util/types";
import { formatMoney } from "../../util/currency";
import { ensureListing, ensureUser } from "../../util/data";
import { richText } from "../../util/richText";
import { createSlug } from "../../util/urlHelpers";
import config from "../../config";

import css from "./ListingCard.css";

const MIN_LENGTH_FOR_LONG_WORDS = 10;

const priceData = (price, intl) => {
  if (price && price.currency === config.currency) {
    const formattedPrice = formatMoney(intl, price);
    return { formattedPrice, priceTitle: formattedPrice };
  } else if (price) {
    return {
      formattedPrice: intl.formatMessage(
        { id: "ListingCard.unsupportedPrice" },
        { currency: price.currency }
      ),
      priceTitle: intl.formatMessage(
        { id: "ListingCard.unsupportedPriceTitle" },
        { currency: price.currency }
      )
    };
  }
  return {};
};

export const ListingCardComponent = props => {
  const {
    className,
    rootClassName,
    intl,
    listing,
    renderSizes,
    setActiveListing,
    isLongCard,
  } = props;
  const classes = classNames(rootClassName || css.root, className);
  const currentListing = ensureListing(listing);
  const id = currentListing.id.uuid;
  const { title = "", price } = currentListing.attributes;
  const category = currentListing && currentListing.attributes.publicData.category ? currentListing.attributes.publicData.category.split('_').join(' ') : null;
  const location = currentListing && currentListing.attributes.publicData.location ? currentListing.attributes.publicData.location.address : null;
  const placeName = location.split(',')[location.split(',').length - 1];
  const pricingDetails = currentListing.attributes.publicData.pricing_scheme;
  const pricingLabel = config.custom.pricing_schemes.find(
    scheme => scheme.key === pricingDetails
  ).label;

  const slug = createSlug(title);
  const author = ensureUser(listing.author);
  const authorName = author.attributes.profile.displayName;
  const authorOrganisation = author.attributes.profile.publicData.organisation
    ? author.attributes.profile.publicData.organisation
    : authorName;
  const duration = currentListing.attributes.publicData.duration
    ? currentListing.attributes.publicData.duration
    : "";
  const cat = config.custom.categories.find(
    category => category.key === currentListing.attributes.publicData.category
  );
  const type = cat ? cat.label : "";
  const firstImage =
    currentListing.images && currentListing.images.length > 0
      ? currentListing.images[0]
      : null;

  const { formattedPrice, priceTitle } = priceData(price, intl);

  return (
    <NamedLink className={classes} name="ListingPage" params={{ id, slug }}>
      <div
        className={css.threeToTwoWrapper}
        onMouseEnter={() => setActiveListing(currentListing.id)}
        onMouseLeave={() => setActiveListing(null)}
      >
        <div className={classNames(isLongCard ? css.aspectWrapperLongCard : css.aspectWrapper)}>
          <ResponsiveImage
            rootClassName={classNames(css.rootForImage, isLongCard ? css.rootForImageLongCard : css.null)}
            alt={title}
            image={firstImage}
            variants={["landscape-crop", "landscape-crop2x"]}
            sizes={renderSizes}
          />
        </div>
      </div>
      <div className={classNames(isLongCard ? css.infoLongCard : css.info)}>
        {isLongCard &&
          <div className={css.categoryLocation}>
            <span>{category}</span>
            <span className={css.placeName}>{(category ? ' - ' : '') + placeName}</span>
          </div>
        }
        {!isLongCard &&
          <div className={classNames(isLongCard ? css.priceLongCard : css.price)}>
            <div className={css.priceValue} title={priceTitle}>
              {formattedPrice}
            </div>
            <div className={css.perUnit}>{pricingLabel}</div>
            <div className={css.perUnit}>{`Duration: ${duration}`}</div>
          </div>
        }
        <div className={css.mainInfo}>
          <div className={classNames(css.title, isLongCard ? css.titleLongCard: css.null)}>
            {richText(title, {
              longWordMinLength: MIN_LENGTH_FOR_LONG_WORDS,
              longWordClass: css.longWord
            })}
          </div>
          {!isLongCard && <div className={css.authorInfo}>{type}</div>}
          {!isLongCard && 
            <div className={css.authorInfo}>
              <FormattedMessage
                className={css.authorName}
                id="ListingCard.hostedBy"
                values={{ authorName: authorOrganisation }}
              />
            </div>
          }
        </div>
        {isLongCard &&
          <div className={css.priceLongCard}>
            <div className={css.priceValueLongCard} title={priceTitle}>
              {formattedPrice}
              <span>{' ' + pricingLabel}</span>
            </div>
          </div>
        }
      </div>
    </NamedLink>
  );
};

ListingCardComponent.defaultProps = {
  className: null,
  rootClassName: null,
  renderSizes: null,
  setActiveListing: () => null
};

ListingCardComponent.propTypes = {
  className: string,
  rootClassName: string,
  intl: intlShape.isRequired,
  listing: propTypes.listing.isRequired,

  // Responsive image sizes hint
  renderSizes: string,

  setActiveListing: func
};

export default injectIntl(ListingCardComponent);
