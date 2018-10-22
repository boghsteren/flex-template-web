import React from "react";

import { StaticPage, TopbarContainer } from "../../containers";
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer
} from "../../components";

import css from "./HowItWorksPage.css";

const HowItWorksPage = () => {
  // Prettier ignore
  return (
    <StaticPage
      title="How it works"
      schema={{
        "@context": "http://schema.org",
        "@type": "WebPage",
        description: "How Goodwings Experiences works",
        name: "How it works page"
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>

        <LayoutWrapperMain className={css.staticPageWrapper}>
          <h1 className={css.pageTitle}>How it works</h1>
          <h2>1. Search for an experience</h2>

          <p>
            Goodwings’ nonprofit partners all around the world have added
            inspiring activities for you to easily book. You can search by
            location, type of experience and group size. You can also filter by social impact
            focus, for example experiences focused on People or Planet.
          </p>
          <p>
            All experiences have been quality-assured by Goodwings, but besides
            the payment, all practical issues surrounding the activities are
            handled by the nonprofit organisations hosting them.
          </p>

          <h2>2. Interact with the host</h2>

          <p>
            When you’ve found what you want, you simply ask about availability
            and get more details about the experience by reaching out to the
            Goodwings partner hosting the experience. All directly through this
            site.
          </p>

          <h2>3. Book the experience</h2>

          <p>
            When you’re ready, it’s fast, easy and secure to book and pay for
            the experience. Besides a 10% transaction fee, the entire amount paid
            will go directly to the nonprofit organisation hosting the
            experience. This helps the nonprofit make a real social impact in
            their community and in the world. It's the fee that enables us to
            run this marketplace.
          </p>

          <h2>4. Receive all practical details </h2>

          <p>
            Following your payment, you will receive all the necessary practical
            details about the experience directly from the organisation or
            person hosting the activity. Share these details with the
            participants and communicate directly with the host about any
            questions you or the participants might have.
          </p>
          <h2>5. Share a review </h2>
          <p>
            When the experience is over, please gather some feedback from the
            participants and add a review of the host here on the site. This
            allows the nonprofit organisations to constantly offer better and
            more exciting experiences.{" "}
          </p>
        </LayoutWrapperMain>

        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

export default HowItWorksPage;
