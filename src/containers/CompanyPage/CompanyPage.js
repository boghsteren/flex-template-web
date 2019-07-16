import React from 'react';

import { StaticPage, TopbarContainer } from '../../containers';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
} from '../../components';

import css from './CompanyPage.css';
import image from './about-us-1440.jpg';

const CompanyPage = () => {
  // prettier-ignore
  return (
    <StaticPage
      title="About Us"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'AboutPage',
        description: 'About Goodwings Experiences',
        name: 'About page',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer/>
        </LayoutWrapperTopbar>

        <LayoutWrapperMain className={css.staticPageWrapper}>
          <h1 className={css.pageTitle}>About Goodwings Experiences</h1>
          <img className={css.coverImage} src={image} alt="A world to explore."/>

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


              </p>
              <p>You can interact directly with the hosts, and when you've found the experience you're interested in,
                it's easy to book and to make a secure payment.
              </p></div>
          </div>
          <div className={css.contentWrapper}>
            <div className={css.contentSide}>
              <p>About Goodwings</p>
            </div>
            <div className={css.contentMain}>

              <p>
                Goodwings is an impact-driven, Denmark-based company built on partnerships. Besides Goodwings Experiences we run www.goodwings.com – a hotel booking platform for corporate travel where every booking results in a donation to a nonprofit.
              </p>
              <p>
                Instead of relying on mass media, our message is spread via social media and our charities. The money we save on marketing is given to these charities, who use it to fund their projects.
              </p>
              <p>
                With Goodwings Experiences we want to offer an innovative service for the travel industry which makes it easy for our nonprofit partners to get access to a new stream of revenue and thereby fuel the fight for a more sustainable future.
              </p>

            </div>
          </div>
          <div className={css.contentWrapper}>
            <div className={css.contentSide}>
              <p>Contact us</p>
            </div>
            <div className={css.contentMain}>
              <p>
                Send us an email at <a href="mailto:hello@gwexperiences.com">hello@gwexperiences.com</a> or call + 45
                60737475.</p>
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

export default CompanyPage;
