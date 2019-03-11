import React from "react";
import { FormattedMessage } from "react-intl";
import { richText } from "../../util/richText";
import config from "../../config";

import css from "./ListingPage.css";

const MIN_LENGTH_FOR_LONG_WORDS_IN_DESCRIPTION = 20;

const SectionDescription = props => {
  const { description, group_size, included, duration, availability } = props;
  let group_size_label = config.custom.group_size_brackets.find(
    entry => entry.key === group_size
  );
  group_size_label = group_size_label ? group_size_label.label : '';
  return (
    <div>
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
      {availability && (
        <div className={css.sectionDescription}>
          <h2 className={css.descriptionTitle}>
            <FormattedMessage id="ListingPage.availabilityHeader" />
          </h2>
          <p className={css.description}>{availability}</p>
        </div>
      )}
      <div className={css.sectionDescription}>
        <h2 className={css.descriptionTitle}>
          <FormattedMessage id="ListingPage.group_sizeHeader" />
        </h2>
        <p className={css.description}>{group_size_label}</p>
      </div>
    </div>
  );
};

export default SectionDescription;
