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
             The price of any given experience on the marketplace consists of the amount paid to nonprofit organisation (the experience host) and a 20% transaction fee. There are no other hidden fees.
              </p>
             <p>
             For example, if an experience costs USD 500, the nonprofit organisation hosting the experience receives this amount. On top of that, we add a 20% transaction fee paid by the customer. This fee makes the marketplace possible. In this example, the total price paid by the customer will be USD 600.
             </p>
             <p>
             Goodwings handle everything relating to the secure payment.
        

              </p>
             </div>
             </div>
             <div className={css.contentWrapper}>

             <div className={css.contentSide}>
             <p>What is Goodwings?</p>
           </div>

           <div className={css.contentMain}>

             <p>
             Goodwings is a Danish company. We run <a href="http://www.goodwings.com">www.goodwings.com</a> – a hotel booking platform for corporate travel where every booking results in a donation to a nonprofit. 
             </p>
             <p>
             We don't spend any money on advertising like the other large hotel booking sites. Instead, we have a global network of nonprofit partners and they act as our marketing channel, spreading the good news about Goodwings. In return, we donate part of our commission to them. That's how we're turning the travel industry into a force for positive and sustainable change. One hotel at a time.
             </p>
             <p>
            <a href="https://www.goodwings.com/en-us/about-us/vision-mission">Read more about us.</a>

             </p>
            </div>
          </div>
             
           <h2>
For customers
              </h2>
          <div className={css.contentWrapper}>
            <div className={css.contentSide}>
              <p>How do I book?</p>
            </div>

            <div className={css.contentMain}>
             
            <p>
When you’ve found the experience you want to book, you can either inquire about more details or specific availability by sending an instant message to the nonprofit organisation hosting the activity. When you’re ready to book, just add the necessary booking details (dates, timeslots etc.) and click on “Request to book”.
</p>
               <p>
               On the next page, you will be able to enter a message to the nonprofit organisation about any specific details, requirements, or needs regarding the booking request. You can enter your payment information and send the booking request to the host.
</p>
<p>
               You will only be charged if the nonprofit organisation accepts your booking request within 48 hours. If they do not accept or deny your booking request within 48 hours, it will automatically expire and you will not be charged.
</p>
             
             </div>
             </div>
             <div className={css.contentWrapper}>

             <div className={css.contentSide}>
             <p>How fo I pay?</p>
           </div>

           <div className={css.contentMain}>

               <p>
               Goodwings Experiences uses Stripe Connect to power payments. You can pay via bank transactions and international credit cards. All payments are secure.
               </p>
             
            </div>
          </div>
  
   <div className={css.contentWrapper}>
            <div className={css.contentSide}>
              <p>How do I know that hosts are who they say they are?</p>
            </div>

            <div className={css.contentMain}>
             

              <p>
At Goodwings we have close relationship with all our nonprofit partners, and we have vetted all of them. We also have continuous quality assurance sessions with them to ensure 1) that their activities live up to the high Goodwings Experiences standards, and 2) that they get the most out of the marketplace. 
               </p>
             <p>
Following the activity, we kindly ask you to provide feedback about the experience and its host directly on the site. This review allows the nonprofit organisation to improve the experience, and it also allows other customers to select the best possible experience.
               </p>
             <p>
You are always welcome to reach out to the Goodwings Experiences team if you have further questions or concerns about one of our partners.        

              </p>
             </div>
             </div>
             <div className={css.contentWrapper}>

             <div className={css.contentSide}>
             <p>How do you make money?</p>
           </div>

           <div className={css.contentMain}>

             <p>
We charge an annual subscription fee for customers to access the experiences. For every experience booked, we charge a 10% transaction fee.
               </p>
           
            </div>
          </div>   
          
                <h2>
For nonprofit organisations
              </h2>
          <div className={css.contentWrapper}>
            <div className={css.contentSide}>
              <p>How do we add an experience?</p>
            </div>

            <div className={css.contentMain}>
             
            <p>
Follow the link in the top menu to add a new experience. You will be asked to fill in all the required information regarding the activity such as a description, price and other details. You will also need to add at least one photo. As soon as you click submit, the Goodwings Experience team will review your experience to ensure that all information is there. We will let you know if anything needs to be updated. Once approved (usually within less than 12 hours) the experience will be available on the marketplace.
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
