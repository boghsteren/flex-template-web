import React from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { injectIntl, intlShape } from "react-intl";
import { isScrollingDisabled } from "../../ducks/UI.duck";
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
  const { history, intl, location, scrollingDisabled, user } = props;

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
              className={css.hero}
              history={history}
              location={location}
            />
            <a className={css.certificateLogoContainer} href="/">
              <img className={css.certificateLogoImage} src={certificateLogo}></img>
            </a>
          </div>

          <ul className={css.sections}>
            {user && (
              <div>
                <li className={css.section}>
                  <div className={css.sectionContent}>
                    <SectionLocations />
                  </div>
                </li>
                <li className={css.section}>
                  <div className={css.sectionContent}>
                    <SectionHighlightsOfTheMonth listings={props.listings} />
                  </div>
                </li>
                <li className={css.section}>
                  <div className={css.sectionContent}>
                    <SectionAllOverTheWorld />
                  </div>
                </li>
                <li className={css.section}>
                  <div className={css.sectionContent}>
                    <SectionHowItWorks />
                  </div>
                </li>
              </div>
            )}
            {!user && (
              <div>
                <li className={classNames(css.section, css.sectionWhatIsIt)}>
                  <div className={css.sectionContent}>
                    <SectionWhatIsIt />
                  </div>
                </li>
                <li className={classNames(css.section, css.sectionExample)}>
                  <div className={classNames(css.sectionContent, css.sectionExampleContent)}>
                    <SectionExample listings={props.listings} />
                  </div>
                </li>
                <li className={css.section}>
                  <div className={css.sectionContent}>
                    <SectionHowItWorks />
                  </div>
                </li>
                <li className={css.section}>
                  <div className={css.sectionContent}>
                    <SectionTargetGroup />
                  </div>
                </li>
              </div>
            )}
          </ul>
        </LayoutWrapperMain>
        <LayoutWrapperFooter>
          <Footer />
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
    user: state.user.currentUser
  };
};

// Note: it is important that the withRouter HOC is **outside** the
// connect HOC, otherwise React Router won't rerender any Route
// components since connect implements a shouldComponentUpdate
// lifecycle hook.
//
// See: https://github.com/ReactTraining/react-router/issues/4671
const LandingPage = compose(withRouter, connect(mapStateToProps), injectIntl)(
  LandingPageComponent
);

LandingPage.loadData = params => {
  return loadData();
};

export default LandingPage;
