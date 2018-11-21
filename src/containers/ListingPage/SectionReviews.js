import React from "react";
import { FormattedMessage } from "react-intl";
import { Reviews } from "../../components";

import css from "./ListingPage.css";

const SectionReviews = props => {
  const { reviews, fetchReviewsError, pdf } = props;

  const reviewsError = (
    <h2 className={css.errorText}>
      <FormattedMessage id="ListingPage.reviewsError" />
    </h2>
  );

  return (
    <div className={pdf ? css.pdfSectionReviews : css.sectionReviews}>
      <h2 className={pdf ? css.pdfReviewsHeading : css.reviewsHeading}>
        <FormattedMessage
          id="ListingPage.reviewsHeading"
          values={{ count: reviews.length }}
        />
      </h2>
      {fetchReviewsError ? reviewsError : null}
      <Reviews reviews={reviews} pdf={pdf} />
    </div>
  );
};

export default SectionReviews;
