import React from 'react';
import config from '../../config';
import { twitterPageURL } from '../../util/urlHelpers';
import { StaticPage, TopbarContainer } from '../../containers';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  ExternalLink,
} from '../../components';

import css from './AboutPage.css';
import image from './about-us-1440.jpg';

const AboutPage = () => {
  const { siteTwitterHandle, siteFacebookPage } = config;
  const siteTwitterPage = twitterPageURL(siteTwitterHandle);

  // prettier-ignore
  return (
    <StaticPage
      title="About Us"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'AboutPage',
        description: 'About Saunatime',
        name: 'About page',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer/>
        </LayoutWrapperTopbar>

        <LayoutWrapperMain className={css.staticPageWrapper}>
          <h1 className={css.pageTitle}>Experience the unique Finnish home sauna.</h1>
          <img className={css.coverImage} src={image} alt="My first ice cream."/>

          <div className={css.contentWrapper}>
            <div className={css.contentSide}>
              <p>Social impact activities that inspire</p>
            </div>

            <div className={css.contentMain}>
              <h2>
                If you're looking for a different and meaningful experience for a study trip, a teambuilding activity,
                or a company event – look no further.

              </h2>

              <p>
                At Goodwings Experiences you can find and book authentic social impact activities all over the world
                hosted by nonprofit organisations.
              </p><p>
              You can interact directly with the hosts, and when you've found the experience you're interested in, it's
              easy to book and to make a secure payment.
            </p>
              <div className={css.contentSide}>
                <p>About Goodwings
                </p>
              </div>

              <p>
                We're a Danish company and besides Goodwings Experiences we run www.goodwings.com – a hotel booking
                platform for corporate travel where every booking results in a donation to a nonprofit.
              </p>
              <p>
                We don't spend any money on advertising like the other large hotel booking sites. Instead, we have a
                global network of nonprofit partners and they act as our marketing channel, spreading the good news
                about Goodwings. In return, we donate part of our commission to them. That's how we're turning the
                travel industry into a force for positive and sustainable change. One hotel at a time.
              </p>


              <h3 id="contact" className={css.subtitle}>
                Create your own marketplace like Saunatime
              </h3>
              <p>
                Saunatime is brought to you by the good folks at{' '}
                <ExternalLink href="http://sharetribe.com">Sharetribe</ExternalLink>. Would you like
                to create your own marketplace platform a bit like Saunatime? Or perhaps a mobile
                app? With Sharetribe it's really easy. If you have a marketplace idea in mind, do
                get in touch!
              </p>
              <p>
                You can also checkout our{' '}
                <ExternalLink href={siteFacebookPage}>Facebook</ExternalLink> and{' '}
                <ExternalLink href={siteTwitterPage}>Twitter</ExternalLink>.
              </p>
            </div>
          </div>
        </LayoutWrapperMain>

        <LayoutWrapperFooter>
          <Footer/>
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

export default AboutPage;
