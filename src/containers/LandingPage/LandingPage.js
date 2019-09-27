import React from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { injectIntl, intlShape } from "react-intl";
import { isScrollingDisabled, manageDisableScrolling } from '../../ducks/UI.duck';
import { loadData } from "./LandingPage.duck";
import classNames from 'classnames';
import certificateLogo from './B-Corp.21a3074a.svg'

import config from "../../config";
import {
  Page,
  SectionHero,
  SectionHowItWorks,
  SectionLocations,
  SectionAllOverTheWorld,
  SectionHighlightsOfTheMonth,
  SectionTargetGroup,
  SectionWhatIsIt,
  SectionExample,
  SectionHelpWorldBetter,
  SectionValuesYourClients,
  SectionSocialImpact,
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer
} from "../../components";
import { TopbarContainer } from "../../containers";

import facebookImage from "../../assets/experiencesFacebook-1200x630.jpg";
import twitterImage from "../../assets/experiencesTwitter-600x314.jpg";
import css from "./LandingPage.css";

export const LandingPageComponent = props => {
  const { history, intl, location, scrollingDisabled, user, listings, unauthListings, onManageDisableScrolling } = props;

  // Schema for search engines (helps them to understand what this page is about)
  // http://schema.org
  // We are using JSON-LD format
  const siteTitle = config.siteTitle;
  const schemaTitle = intl.formatMessage(
    { id: "LandingPage.schemaTitle" },
    { siteTitle }
  );
  const schemaDescription = intl.formatMessage({
    id: "LandingPage.schemaDescription"
  });
  const schemaImage = `${config.canonicalRootURL}${facebookImage}`;
  const isTA = !!(user && !user.attributes.profile.publicData.provider);
  return (
    <Page
      className={css.root}
      scrollingDisabled={scrollingDisabled}
      contentType="website"
      description={schemaDescription}
      title={schemaTitle}
      facebookImages={[{ url: facebookImage, width: 1200, height: 630 }]}
      twitterImages={[
        {
          url: `${config.canonicalRootURL}${twitterImage}`,
          width: 600,
          height: 314
        }
      ]}
      schema={{
        "@context": "http://schema.org",
        "@type": "WebPage",
        description: schemaDescription,
        name: schemaTitle,
        image: [schemaImage]
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>
        <LayoutWrapperMain>
          <div className={css.heroContainer}>
            <SectionHero
              currentUser={user}
              className={css.hero}
              history={history}
              location={location}
            />
            <a className={css.certificateLogoContainer} href="/">
              <img className={css.certificateLogoImage} src={certificateLogo}/>
            </a>
          </div>

          <ul className={css.sections}>
            {/*for non user*/}
            {!user && (
              <div>
                <li className={classNames(css.section, css.sectionWhatIsIt)}>
                  <div className={css.sectionContent}>
                    <SectionWhatIsIt />
                  </div>
                </li>
                <li className={classNames(css.section, css.sectionExample)}>
                  <div className={classNames(css.sectionContent, css.sectionExampleContent)}>
                    <SectionExample
                      listings={unauthListings}
                    />
                  </div>
                </li>
                <li className={classNames(css.section, css.sectionHelpWorldBetter)}>
                  <div className={css.sectionContent}>
                    <SectionHelpWorldBetter />
                  </div>
                </li>
                <li className={classNames(css.section, css.sectionContentGray)}>
                  <div className={css.sectionContent}>
                    <SectionHowItWorks />
                  </div>
                </li>
                <li className={classNames(css.section, css.sectionContentGray)}>
                  <div className={css.sectionContent}>
                    <SectionTargetGroup
                      className={css.SectionTargetGroup}
                    />
                  </div>
                </li>
              </div>
            )}
            {/*for NGO*/}
            {!isTA && user && (
              <div>
                <li className={css.section}>
                  <div className={css.sectionContent}>
                    <SectionLocations />
                  </div>
                </li>
                <li className={css.section}>
                  <div className={classNames(css.sectionContent, css.paddingTop0)}>
                    <SectionHighlightsOfTheMonth listings={listings} user={user}/>
                  </div>
                </li>
                <li className={css.section}>
                  <div className={classNames(css.sectionContent, css.reSpacing)}>
                    <SectionAllOverTheWorld />
                  </div>
                </li>
                <li className={classNames(css.section, css.sectionContentGray)}>
                  <div className={classNames(css.sectionContent, css.reSpacing)}>
                    <SectionHowItWorks user={user} />
                  </div>
                </li>
              </div>
            )}
            {/*for TA*/}
            {isTA && user && (
              <div>
                <li className={css.section}>
                  <div className={css.sectionContent}>
                    <SectionValuesYourClients
                      onManageDisableScrolling={onManageDisableScrolling}
                    />
                  </div>
                </li>
                <li className={classNames(css.section, css.sectionContentGray)}>
                  <div className={css.sectionContent}>
                    <SectionHowItWorks user={user} />
                  </div>
                </li>
                <li className={classNames(css.section, css.socialImpactContainer)}>
                  <div className={classNames(css.socialImpactTitle)}>
                    <SectionSocialImpact user={user} />
                  </div>
                </li>
              </div>
            )}
          </ul>
        </LayoutWrapperMain>
        <LayoutWrapperFooter>
          <Footer user={user}/>
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </Page>
  );
};

const { bool, array, object } = PropTypes;

LandingPageComponent.propTypes = {
  scrollingDisabled: bool.isRequired,

  // from withRouter
  history: object.isRequired,
  location: object.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
  listings: array
};

const mapStateToProps = state => {

  return {
    scrollingDisabled: isScrollingDisabled(state),
    listings: state.LandingPage.listings,
    unauthListings: state.LandingPage.unauthListings,
    user: state.user.currentUser,
  };
};

const mapDispatchToProps = dispatch => ({
  onManageDisableScrolling: (componentId, disableScrolling) =>
    dispatch(manageDisableScrolling(componentId, disableScrolling)),
});

// Note: it is important that the withRouter HOC is **outside** the
// connect HOC, otherwise React Router won't rerender any Route
// components since connect implements a shouldComponentUpdate
// lifecycle hook.
//
// See: https://github.com/ReactTraining/react-router/issues/4671
const LandingPage = compose(withRouter, connect(mapStateToProps, mapDispatchToProps), injectIntl)(
  LandingPageComponent
);

LandingPage.loadData = () => {
  return loadData();
};

export default LandingPage;
