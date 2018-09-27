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
  // prettier-ignore
  return (
    <StaticPage
      title="How it works"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'WebPage',
        description: 'How Goodwings Experiences works',
        name: 'How it works page',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>

        <LayoutWrapperMain className={css.staticPageWrapper}>
          <h1 className={css.pageTitle}>How it works.</h1>
              <h2>
1. Create your profile

              </h2>

              <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse elementum magna ullamcorper, tincidunt nulla sed, ultrices massa. Curabitur blandit vulputate dictum. Nullam et orci in eros iaculis sollicitudin. Proin et lorem urna. Cras a odio est. Nulla volutpat, nulla quis condimentum egestas, ipsum lectus hendrerit quam, vitae ornare turpis est sit amet tortor. Pellentesque porttitor, velit in scelerisque consectetur, ex ligula fringilla tellus, nec interdum felis eros quis massa. Nullam at neque interdum, eleifend sapien in, malesuada urna. Sed quis dui consectetur, semper velit vitae, maximus est.


              </p>
              <h2>
              2. Find your experience
              
                            </h2>
              
                            <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse elementum magna ullamcorper, tincidunt nulla sed, ultrices massa. Curabitur blandit vulputate dictum. Nullam et orci in eros iaculis sollicitudin. Proin et lorem urna. Cras a odio est. Nulla volutpat, nulla quis condimentum egestas, ipsum lectus hendrerit quam, vitae ornare turpis est sit amet tortor. Pellentesque porttitor, velit in scelerisque consectetur, ex ligula fringilla tellus, nec interdum felis eros quis massa. Nullam at neque interdum, eleifend sapien in, malesuada urna. Sed quis dui consectetur, semper velit vitae, maximus est.
              
              
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
