import React from "react";
import { string, any } from "prop-types";
import { FormattedMessage, injectIntl, intlShape } from "react-intl";
import classNames from "classnames";
import { twitterPageURL } from "../../util/urlHelpers";
import config from "../../config";
import {
  IconSocialMediaFacebook,
  IconSocialMediaInstagram,
  IconSocialMediaTwitter,
  Logo,
  ExternalLink,
  NamedLink
} from "../../components";

import css from "./Footer.css";

const renderSocialMediaLinks = intl => {
  const { siteFacebookPage, siteInstagramPage, siteTwitterHandle } = config;
  const siteTwitterPage = twitterPageURL(siteTwitterHandle);

  const goToFb = intl.formatMessage({ id: "Footer.goToFacebook" });
  const goToInsta = intl.formatMessage({ id: "Footer.goToInstagram" });
  const goToTwitter = intl.formatMessage({ id: "Footer.goToTwitter" });

  const fbLink = siteFacebookPage ? (
    <ExternalLink
      key="linkToFacebook"
      href={siteFacebookPage}
      className={css.icon}
      title={goToFb}
    >
      <IconSocialMediaFacebook />
    </ExternalLink>
  ) : null;

  const twitterLink = siteTwitterPage ? (
    <ExternalLink
      key="linkToTwitter"
      href={siteTwitterPage}
      className={css.icon}
      title={goToTwitter}
    >
      <IconSocialMediaTwitter />
    </ExternalLink>
  ) : null;

  const instragramLink = siteInstagramPage ? (
    <ExternalLink
      key="linkToInstagram"
      href={siteInstagramPage}
      className={css.icon}
      title={goToInsta}
    >
      <IconSocialMediaInstagram />
    </ExternalLink>
  ) : null;
  return [fbLink, twitterLink, instragramLink].filter(v => v != null);
};

const Footer = props => {
  const { rootClassName, className, intl, user } = props;
  const socialMediaLinks = renderSocialMediaLinks(intl);
  const classes = classNames(rootClassName || css.root, className);
  const isNGO = user && user.attributes && user.attributes.profile.publicData && user.attributes.profile.publicData.provider;

  return (
    <div className={classes}>
      <div className={css.topBorderWrapper}>
        <div className={css.content}>
          <div className={css.someLiksMobile}>{socialMediaLinks}</div>
          <div className={css.links}>
            <div className={css.organization} id="organization">
              <NamedLink name="SearchPage" className={css.logoLink}>
                <Logo format="desktop" className={css.logo} />
              </NamedLink>
              <div className={css.organizationInfo}>
                <p className={css.organizationDescription}>
                  <FormattedMessage id="Footer.organizationDescription" />
                </p>
                <p className={css.organizationDescription}>
                  <a href="mailto:hello@gwexperiences.com">hello@gwexperiences.com</a>
                </p>
                <p className={css.organizationCopyright}>
                  <NamedLink name="LandingPage" className={css.copyrightLink}>
                    <FormattedMessage id="Footer.copyright" />
                  </NamedLink>
                </p>
              </div>
            </div>
            <div className={css.infoLinks}>
              <ul className={css.list}>
                <b>Get started</b>
                <li className={css.listItem}>
                  <NamedLink
                    name="SearchPage"
                    to={{
                      search: "?"
                    }}
                    className={css.link}
                  >
                    <FormattedMessage id="Footer.findExperiences" />
                  </NamedLink>
                </li>
              </ul>
            </div>
            <div className={classNames(css.searches, css.paddingLeft)}>
              <ul className={css.list}>
                <b>Help</b>

                <li className={css.listItem}>
                  <NamedLink name="FAQPage" className={css.link}>
                    <FormattedMessage id="Footer.toFAQPage" />
                  </NamedLink>
                </li>

                {
                  isNGO && (
                    <li className={css.listItem}>
                      <a href="https://www.get.gwexperiences.com/howto" className={css.link}>
                        <FormattedMessage id="Footer.activityGuide" />
                      </a>
                    </li>
                  )
                }
                {/*<li className={css.listItem}>*/}
                {/*  <NamedLink name="HowPage" className={css.link}>*/}
                {/*    <FormattedMessage id="Footer.toHelpPage" />*/}
                {/*  </NamedLink>*/}
                {/*</li>*/}
              </ul>
            </div>
            <div className={css.searches}>
              <ul className={css.list}>
                <b>About us</b>
                <li className={css.listItem}>
                  <NamedLink name="AboutPage" className={css.link}>
                    <FormattedMessage id="Footer.toAboutPage" />
                  </NamedLink>
                </li>
              </ul>
            </div>
            <div className={css.extraLinks}>
              <div className={css.someLinks}>{socialMediaLinks}</div>
              <div className={css.legalMatters}>
                <ul className={css.tosAndPrivacy}>
                  <li className={css.listItem}>
                    <NamedLink
                      name="TermsOfServicePage"
                      className={css.legalLink}
                    >
                      <FormattedMessage id="Footer.termsOfUse" />
                    </NamedLink>
                  </li>
                  <li>
                    <NamedLink
                      name="PrivacyPolicyPage"
                      className={css.legalLink}
                    >
                      <FormattedMessage id="Footer.privacyPolicy" />
                    </NamedLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className={css.copyrightAndTermsMobile}>
            <NamedLink
              name="LandingPage"
              className={css.organizationCopyrightMobile}
            >
              <FormattedMessage id="Footer.copyright" />
            </NamedLink>
            <div className={css.tosAndPrivacyMobile}>
              <NamedLink name="PrivacyPolicyPage" className={css.privacy}>
                <FormattedMessage id="Footer.privacy" />
              </NamedLink>
              <NamedLink name="TermsOfServicePage" className={css.terms}>
                <FormattedMessage id="Footer.terms" />
              </NamedLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Footer.defaultProps = {
  rootClassName: null,
  className: null
};

Footer.propTypes = {
  rootClassName: string,
  className: string,
  intl: intlShape.isRequired,
  user: any,
};

export default injectIntl(Footer);
