import React from "react";

import { StaticPage, TopbarContainer } from "../../containers";
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer
} from "../../components";

import css from "./CompanyPage.css";
import image from "./about-us-1440.jpg";

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
          <TopbarContainer />
        </LayoutWrapperTopbar>

        <LayoutWrapperMain className={css.staticPageWrapper}>
          <h1 className={css.pageTitle}>About Goodwings Experiences.</h1>
          <img className={css.coverImage} src={image} alt="A world to explore." />

          <div className={css.contentWrapper}>
            <div className={css.contentSide}>
              <p>Social impact activities that inspire</p>
            </div>

            <div className={css.contentMain}>
              <h2>
              If you're looking for a different and meaningful experience for a study trip, a teambuilding activity, or a company event – look no further.


              </h2>

              <p>
              At Goodwings Experiences you can find and book authentic social impact activities all over the world hosted by nonprofit organisations.


              </p>
<p>You can interact directly with the hosts, and when you've found the experience you're interested in, it's easy to book and to make a secure payment.
</p></div></div>
<div className={css.contentWrapper}>
<div className={css.contentSide}>
<p>About Goodwings</p>
</div>
<div className={css.contentMain}>

              <p>
              We're a Danish company and besides Goodwings Experiences we run <a href="https://www.goodwings.com">www.goodwings.com</a> – a hotel booking platform for corporate travel where every booking results in a donation to a nonprofit. 
              </p>
<p>
We don't spend any money on advertising like the other large hotel booking sites. Instead, we have a global network of nonprofit partners and they act as our marketing channel, spreading the good news about Goodwings. In return, we donate part of our commission to them. That's how we're turning the travel industry into a force for positive and sustainable change. One hotel at a time.
</p>
<p>
<a href="https://www.goodwings.com/en-us/about-us/vision-mission">Read more about us.</a>
</p>
            </div></div>
            <div className={css.contentWrapper}>
            <div className={css.contentSide}>
            <p>Contact us</p>
</div>
            <div className={css.contentMain}>
<p>
            Send us an email at <a href="mailto:experiences@goodwings.com">experiences@goodwings.com</a> or call + 45 60 73 74 75.</p>
            </div></div>
        </LayoutWrapperMain>

        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

export default CompanyPage;
