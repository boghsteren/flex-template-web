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
             <p>How does Goodwings Experiences work?</p>
           </div>

           <div className={css.contentMain}>

             <p>
             Nonprofit organisations add their social impact activities to the marketplace. Travel agencies/tour operators – as well as other companies looking for authentic experiences – can inquire about the posted activities and book them directly through the marketplace by making a secure payment via bank account or an international creditcard.

             </p>
            </div>
          </div>
  
   <div className={css.contentWrapper}>
            <div className={css.contentSide}>
              <p>Who receives the money?</p>
            </div>

            <div className={css.contentMain}>
             

              <p>
             The price of any given experience on the marketplace consists of the amount paid to nonprofit organisation (the experience host) and a 20% transaction fee. There are no other hidden fees. Example, if an experience costs USD 500, the nonprofit organisation hosting the experience receives this amount. On top of that, we add a 20% transaction fee paid by the customer. This fee makes the marketplace possible. In this example, the total price paid by the customer will be USD 600.  Goodwings handle everything relating to the secure payment.

              </p>
             </div>
             </div>
             <div className={css.contentWrapper}>

             <div className={css.contentSide}>
             <p>What is Goodwings?</p>
           </div>

           <div className={css.contentMain}>

             <p>
             Goodwings is a Danish company. We run www.goodwings.com – a hotel booking platform for corporate travel where every booking results in a donation to a nonprofit. 

We don't spend any money on advertising like the other large hotel booking sites. Instead, we have a global network of nonprofit partners and they act as our marketing channel, spreading the good news about Goodwings. In return, we donate part of our commission to them. That's how we're turning the travel industry into a force for positive and sustainable change. One hotel at a time.

Read more about us. Link: https://www.goodwings.com/en-us/about-us/vision-mission

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
