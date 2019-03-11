import React from "react";
import { FormattedMessage } from "react-intl";
import { InlineTextButton } from "../../components";

import css from "./ListingPage.css";

const SectionHeading = props => {
  const {
    currentUser,
    priceTitle,
    formattedPrice,
    richTitle,
    category,
    hostLink,
    showContactUser,
    onContactUser,
    pricing_scheme,
    pdf
  } = props;
  return (
    <div className={pdf ? css.pdfSectionHeading : css.sectionHeading}>
      {!pdf && (
        <div className={css.desktopPriceContainer}>
          <div className={css.desktopPriceValue} title={priceTitle}>
            {formattedPrice}
          </div>
          <div className={css.desktopPerUnit}>{pricing_scheme} </div>
          <div className={css.exclude10pcServiceFee}>
            <FormattedMessage id="ListingPage.exclude10pcServiceFee" />
          </div>
        </div>
      )}
      <div className={css.heading}>
        <h1 className={css.title}>{richTitle}</h1>
        <div className={css.author}>
          {category}
          {currentUser &&
            <FormattedMessage
              id="ListingPage.hostedBy"
              values={{ name: hostLink }}
            />
          }
          {showContactUser && currentUser ? (
            <span className={css.contactWrapper}>
              <span className={css.separator}>•</span>
              <InlineTextButton
                className={css.contactLink}
                onClick={onContactUser}
              >
                <FormattedMessage id="ListingPage.contactUser" />
              </InlineTextButton>
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SectionHeading;
