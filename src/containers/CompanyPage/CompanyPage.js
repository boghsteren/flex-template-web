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
import image from "./globe.jpg";

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
              <p>Lorem ipsum!</p>
            </div>

            <div className={css.contentMain}>
              <h2>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse elementum magna ullamcorper, tincidunt nulla sed, ultrices massa. Curabitur blandit vulputate dictum. Nullam et orci in eros iaculis sollicitudin. Proin et lorem urna. Cras a odio est. Nulla volutpat, nulla quis condimentum egestas, ipsum lectus hendrerit quam, vitae ornare turpis est sit amet tortor. Pellentesque porttitor, velit in scelerisque consectetur, ex ligula fringilla tellus, nec interdum felis eros quis massa. Nullam at neque interdum, eleifend sapien in, malesuada urna. Sed quis dui consectetur, semper velit vitae, maximus est.


              </h2>

              <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse elementum magna ullamcorper, tincidunt nulla sed, ultrices massa. Curabitur blandit vulputate dictum. Nullam et orci in eros iaculis sollicitudin. Proin et lorem urna. Cras a odio est. Nulla volutpat, nulla quis condimentum egestas, ipsum lectus hendrerit quam, vitae ornare turpis est sit amet tortor. Pellentesque porttitor, velit in scelerisque consectetur, ex ligula fringilla tellus, nec interdum felis eros quis massa. Nullam at neque interdum, eleifend sapien in, malesuada urna. Sed quis dui consectetur, semper velit vitae, maximus est.


              </p>

              <h3 className={css.subtitle}>Looking to partner with us?</h3>

              <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse elementum magna ullamcorper, tincidunt nulla sed, ultrices massa. Curabitur blandit vulputate dictum. Nullam et orci in eros iaculis sollicitudin. Proin et lorem urna. Cras a odio est. Nulla volutpat, nulla quis condimentum egestas, ipsum lectus hendrerit quam, vitae ornare turpis est sit amet tortor. Pellentesque porttitor, velit in scelerisque consectetur, ex ligula fringilla tellus, nec interdum felis eros quis massa. Nullam at neque interdum, eleifend sapien in, malesuada urna. Sed quis dui consectetur, semper velit vitae, maximus est.


              </p>

            </div>
          </div>
        </LayoutWrapperMain>

        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

export default CompanyPage;
