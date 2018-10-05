import React from "react";

import { StaticPage, TopbarContainer } from "../../containers";
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer
} from "../../components";

import css from "./FAQPage.css";

const FAQPage = () => {
  // prettier-ignore
  return (
    <StaticPage
      title="Frequently asked questions"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'FAQ',
        description: 'Frequently asked questions',
        name: 'FAQ page',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>

        <LayoutWrapperMain className={css.staticPageWrapper}>
          <h1 className={css.pageTitle}>Frequently asked questions</h1>
 <h2>
General questions
              </h2>
          <div className={css.contentWrapper}>
            <div className={css.contentSide}>
              <p>What is Goodwings Experiences?</p>
            </div>

            <div className={css.contentMain}>
             

              <p>
             Goodwings Experiences is an online marketplace for social impact activities all over the world. The activities (or “experiences”) are hosted by nonprofit organisations.

              </p>
             </div>
             </div>
             <div className={css.contentWrapper}>

             <div className={css.contentSide}>
             <p>Where does my money go?</p>
           </div>

           <div className={css.contentMain}>
             <h2>
It helps the world!

             </h2>

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

export default FAQPage;
