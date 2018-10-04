import React from "react";
import { FormattedMessage } from "react-intl";
import { richText } from "../../util/richText";

import css from "./ListingPage.css";

const MIN_LENGTH_FOR_LONG_WORDS_IN_DESCRIPTION = 20;

const SectionDescription = props => {
  const { description, group_size, included, duration } = props;
  return (
    <div>
      <div className={css.sectionDescription}>
        <h2 className={css.descriptionTitle}>
          <FormattedMessage id="ListingPage.group_sizeHeader" />
        </h2>
        <p className={css.description}>{group_size}</p>
      </div>
      <div className={css.sectionDescription}>
        <h2 className={css.descriptionTitle}>
          <FormattedMessage id="ListingPage.descriptionTitle" />
        </h2>
        <p className={css.description}>
          {richText(description, {
            longWordMinLength: MIN_LENGTH_FOR_LONG_WORDS_IN_DESCRIPTION,
            longWordClass: css.longWord
          })}
        </p>
      </div>
      {included && (
        <div className={css.sectionDescription}>
          <h2 className={css.descriptionTitle}>
            <FormattedMessage id="ListingPage.includedHeader" />
          </h2>
          <p className={css.description}>{included}</p>
        </div>
      )}
      {duration && (
        <div className={css.sectionDescription}>
          <h2 className={css.descriptionTitle}>
            <FormattedMessage id="ListingPage.durationHeader" />
          </h2>
          <p className={css.description}>{duration}</p>
        </div>
      )}
    </div>
  );
};

export default SectionDescription;
