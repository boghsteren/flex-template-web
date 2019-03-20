import React from 'react';
import { FormattedMessage } from 'react-intl';
import { PropertyGroup } from '../../components';

import css from './ListingPage.css';

const SectionFeatures = props => {
  const { options, selectedOptions, whyBuyThis } = props;
  return (
    <div className={css.sectionImpactFocus}>
      <div className={css.sectionFeatures}>
        <h2 className={css.featuresTitle}>
          <FormattedMessage id="ListingPage.featuresTitle" />
        </h2>
        <PropertyGroup
          id="ListingPage.goals"
          options={options}
          selectedOptions={selectedOptions}
          twoColumns={true}
        />
      </div>
      <div className={css.sectionFeatures}>
        <h2 className={css.descriptionTitle}>
          <FormattedMessage id="ListingPage.whyBuyThisTitle" />
        </h2>
        <p className={css.description}>{whyBuyThis}</p>
      </div>
    </div>
  );
};

export default SectionFeatures;
