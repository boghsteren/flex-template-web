import React from "react";
import { injectIntl, intlShape } from "react-intl";
import { arrayOf, string } from "prop-types";
import classNames from "classnames";
import { Avatar, ReviewRating } from "../../components";
import { propTypes } from "../../util/types";

import css from "./Reviews.css";

const authorDisplayName = (review, intl) => {
  return review.author.attributes.banned
    ? intl.formatMessage({ id: "Reviews.bannedUserDisplayName" })
    : review.author.attributes.profile.displayName;
};

const Review = props => {
  const { review, intl, pdf } = props;

  const date = review.attributes.createdAt;
  const dateString = intl.formatDate(date, { month: "long", year: "numeric" });

  return (
    <div className={css.review}>
      {!pdf && <Avatar className={css.avatar} user={review.author} />}
      <div>
        <ReviewRating
          rating={review.attributes.rating}
          className={css.mobileReviewRating}
          reviewStarClassName={css.reviewRatingStar}
        />
        <p className={pdf ? css.pdfReviewContent : css.reviewContent}>
          {review.attributes.content}
        </p>
        <p className={css.reviewInfo}>
          {authorDisplayName(review, intl)}
          <span className={css.separator}>•</span>
          {dateString}
          <span className={css.desktopSeparator}>•</span>
          <span className={css.desktopReviewRatingWrapper}>
            <ReviewRating
              rating={review.attributes.rating}
              className={css.desktopReviewRating}
              reviewStarClassName={css.reviewRatingStar}
            />
          </span>
        </p>
      </div>
    </div>
  );
};

Review.propTypes = {
  review: propTypes.review.isRequired,
  intl: intlShape.isRequired
};

const ReviewsComponent = props => {
  const { className, rootClassName, reviews, intl, pdf } = props;
  const classes = classNames(rootClassName || css.root, className);

  return (
    <ul className={classes}>
      {reviews.map(r => {
        return (
          <li key={`Review_${r.id.uuid}`} className={css.reviewItem}>
            <Review review={r} intl={intl} pdf={pdf} />
          </li>
        );
      })}
    </ul>
  );
};

ReviewsComponent.defaultProps = {
  className: null,
  rootClassName: null,
  reviews: []
};

ReviewsComponent.propTypes = {
  className: string,
  rootCalssName: string,
  reviews: arrayOf(propTypes.review),

  // from injectIntl
  intl: intlShape.isRequired
};

const Reviews = injectIntl(ReviewsComponent);

export default Reviews;
