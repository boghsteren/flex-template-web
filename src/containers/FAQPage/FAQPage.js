import React from 'react';

import { StaticPage, TopbarContainer } from '../../containers';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
} from '../../components';
import { connect } from 'react-redux';

import css from './FAQPage.css';

const FAQPage = props => {
  const {
    currentUser,
  } = props;

  const isLogged = currentUser && currentUser.attributes;

  const isNGO = isLogged && currentUser.attributes.profile.publicData && currentUser.attributes.profile.publicData.provider;

  const NGOFaq = (
    <div>
      <div className={css.contentWrapper}>

        <div className={css.contentSide}>
          <p>How do we add an experience?</p>
        </div>

        <div className={css.contentMain}>
          <p>
            Before adding an experience, you will need to fill out your banking information under the account settings.
            If
            your country is not available on the list (we’ll be adding more countries soon), please get in touch with us
            and we will help you. You can now add an experience.
          </p>
          <p>
            Follow the link in the top menu to add a new experience. You will be asked to fill in all the required
            information regarding the activity such as a description, price and other details. You will also need to add
            at least one photo. As soon as you click submit, the Goodwings Experiences team will review your experience
            to
            ensure that all information is available. We will contact you if anything needs to be updated. Once approved
            (usually within less than 12 hours), the experience will be available on the marketplace.
          </p>
        </div>
      </div>

      <div className={css.contentWrapper}>
        <div className={css.contentSide}>
          <p>How do I know if the booking is confirmed?</p>
        </div>
        <div className={css.contentMain}>
          <p>
            Once you have accepted the booking request from the travel agent/tour operator or private group, the booking
            is finalised. You can now prepare for the experience.
          </p>
        </div>
      </div>

      <div className={css.contentWrapper}>
        <div className={css.contentSide}>
          <p>What happens if the travellers cancel their experience?</p>
        </div>
        <div className={css.contentMain}>
          <p>
            If a traveller cancels the experiences 7 days before the date of the experience, he/she will get a full
            refund. However, if the travellers cancel the experience 6 or fewer days before the date of the experience,
            50% of the payment of the experience will be refunded to the travel agent/the traveller, the remaining 50%
            will be paid to your nonprofit organisation.
          </p>
        </div>
      </div>

      <div className={css.contentWrapper}>
        <div className={css.contentSide}>
          <p>What if I would like to cancel a booking?</p>
        </div>
        <div className={css.contentMain}>
          <p>
            If you cancel the experience within 4 weeks before the date of the experience, you will have to provide a
            similar experience that the travel agent/traveller agrees to. If the travel agent/traveller do not agree to
            the new experience or if you, as a nonprofit organisation, cannot provide a similar experience, you will
            need to pay 50% of the payment of the experience for the undelivered experience.
          </p>
          <p>
            If you cancel the experience within 2 weeks of the date of the experience, you will also have to provide a
            similar experience that the travel agent/traveller agrees to. If the travel agent/traveller do not agree to
            the new experience or if you, as a nonprofit organisation, cannot provide a similar experience, you will
            need to pay for the full price of the undelivered experience.
          </p>
        </div>
      </div>

      <div className={css.contentWrapper}>
        <div className={css.contentSide}>
          <p>How will I get paid?</p>
        </div>
        <div className={css.contentMain}>
          <p>
            You will be paid through the bank account details you provided us. If you have registered without your bank
            account, we will then transferred the payment manually.
          </p>
        </div>
      </div>

      <div className={css.contentWrapper}>
        <div className={css.contentSide}>
          <p>When will I be paid?</p>
        </div>
        <div className={css.contentMain}>
          <p>
            The payment will be transferred to your bank account the following day of the experience. Be aware that it
            can take up to 7 days for the payment to be transferred to your bank account.
          </p>
        </div>
      </div>

      <div className={css.contentWrapper}>
        <div className={css.contentSide}>
          <p>What kind of experience can I offer? </p>
        </div>
        <div className={css.contentMain}>
          <p>
            Some of the most popular categories of experience includes guided tours, workshops, cooking classes,
            lectures, alternatively, you can look through some other experiences we offer on the platform for
            inspiration. If you are still in doubt, you can look at this guide here:
            <a href="https://www.get.gwexperiences.com/howto">https://www.get.gwexperiences.com/howto</a>
          </p>
        </div>
      </div>

    </div>
  );

  const notLoggedFaq = (
    <div>
      <h2>
        For travellers
      </h2>
      <div className={css.contentWrapper}>
        <div className={css.contentSide}>
          <p>How do I book?</p>
        </div>

        <div className={css.contentMain}>
          <p>
            Type in your group information in the contact form to the right of the experience. The Goodwings
            Experiences Team will contact you and start planning your dream trip.
          </p>
        </div>
      </div>

      <div className={css.contentWrapper}>

        <div className={css.contentSide}>
          <p>How do I pay?</p>
        </div>

        <div className={css.contentMain}>

          <p>
            Goodwings Experiences uses Stripe Connect to power payments. You can pay via bank transactions and
            international credit cards. All payments are secure.
          </p>

        </div>
      </div>

      <div className={css.contentWrapper}>

        <div className={css.contentSide}>
          <p>Are there booking fee applicable?</p>
        </div>

        <div className={css.contentMain}>
          <p>
            For every experience booked, we charge a 10% service fee, which enables us to run this marketplace.
          </p>
        </div>
      </div>

      <div className={css.contentWrapper}>
        <div className={css.contentSide}>
          <p>How do I know that hosts are who they say they are?</p>
        </div>

        <div className={css.contentMain}>
          <p>
            At Goodwings we have a close relationship with all our nonprofit partners, and we have vetted all of
            them. We also have continuous quality assurance sessions with our nonprofit partners to ensure 1) that
            their activities live up to the high Goodwings Experiences standards, and 2) that they get the most out
            of the marketplace.
          </p>
          <p>
            Following the activity, we kindly ask you to write a review about the experience and its host directly
            on the site. This review allows the nonprofit organisation to improve the experience, and it also allows
            other customers to select the best possible experience.
          </p>
          <p>
            You are always welcome to reach out to the Goodwings Experiences team if you have further questions or
            concerns about one of our partners.
          </p>
        </div>
      </div>

      <h2>
        For nonprofit organisations
      </h2>
      <a href="https://www.get.gwexperiences.com/host">https://www.get.gwexperiences.com/host</a>

      <h2>
        For Travel agents/ tour operators
      </h2>
      <a href="https://www.get.gwexperiences.com/agent">https://www.get.gwexperiences.com/agent</a>

      <br/>
    </div>
  );

  const agentFaq = (
    <div>
      <div className={css.contentWrapper}>
        <div className={css.contentSide}>
          <p>How do I book?</p>
        </div>
        <div className={css.contentMain}>
          <p>
            Step 1: Interact with the host. When you’ve found the experience you want to book, you can send a message to
            the nonprofit organisation about any specific details, requirements, or needs regarding the booking request.
          </p>
          <p>
            Step 2: Send a request. After the nonprofit host has informed you about the details of the experience, you
            are all set to book! Simply add the necessary booking details (dates, time slots etc.) and click on “Request
            to book”. You have the option to write a message again to the nonprofit host.
          </p>
          <p>
            Step 3: Waiting for the booking to be accepted. After you have sent the booking request, the nonprofit host
            has 48 hours to respond to your booking request.
          </p>
          <p>
            Step 4: Enter payment details. As soon as the nonprofit host has accepted your booking, you can enter your
            payment details. Alternatively, we will send you a notification via email to pay two weeks before the date
            of the experience.
          </p>
        </div>
      </div>

      <div className={css.contentWrapper}>
        <div className={css.contentSide}>
          <p>How do I pay?</p>
        </div>
        <div className={css.contentMain}>
          <p>
            Goodwings Experiences uses Stripe Connect to power payments. You can pay via bank transactions and
            international credit cards. All payments are secure.
          </p>
        </div>
      </div>

      <div className={css.contentWrapper}>
        <div className={css.contentSide}>
          <p>When should I pay?</p>
        </div>
        <div className={css.contentMain}>
          <p>
            You can pay as soon as the NGO has accepted your request. Alternatively, you will receive a notification via
            email to fill in your payment information two weeks before the start date of the experience. The deadline
            for payment is 7 days before the date of the experience.
          </p>
        </div>
      </div>

      <div className={css.contentWrapper}>
        <div className={css.contentSide}>
          <p>What if I missed the deadline for payment? </p>
        </div>
        <div className={css.contentMain}>
          <p>
            The booking will be automatically cancelled if you have missed the deadline for payment.
          </p>
        </div>
      </div>


      <div className={css.contentWrapper}>
        <div className={css.contentSide}>
          <p>What if the nonprofit host did not accept my booking request?</p>
        </div>
        <div className={css.contentMain}>
          <p>
            Contact the nonprofit again to find out why they did not accept the booking. For example, if it is an issue
            with date and time, you can message the host to agree on a different available date and time, and request
            for a new booking.
          </p>
        </div>
      </div>

      <div className={css.contentWrapper}>
        <div className={css.contentSide}>
          <p>How do I know if a booking is confirmed?</p>
        </div>
        <div className={css.contentMain}>
          <p>
            Once the nonprofit has accepted your booking request, you will receive a notification email.
          </p>
        </div>
      </div>

      <div className={css.contentWrapper}>
        <div className={css.contentSide}>
          <p>Are there booking fee applicable? </p>
        </div>
        <div className={css.contentMain}>
          <p>
            We, Goodwings Experiences, take 10% service fee on top of the price of the experiences.
          </p>
        </div>
      </div>

      <div className={css.contentWrapper}>
        <div className={css.contentSide}>
          <p>Are there booking fee applicable? </p>
        </div>
        <div className={css.contentMain}>
          <p>
            We, Goodwings Experiences, take 10% service fee on top of the price of the experiences.
          </p>
        </div>
      </div>

      <div className={css.contentWrapper}>
        <div className={css.contentSide}>
          <p>How do I know that hosts are who they say they are?</p>
        </div>

        <div className={css.contentMain}>
          <p>
            At Goodwings we have a close relationship with all our nonprofit partners, and we have vetted all of
            them. We also have continuous quality assurance sessions with our nonprofit partners to ensure 1) that
            their activities live up to the high Goodwings Experiences standards, and 2) that they get the most out
            of the marketplace.
          </p>
          <p>
            Following the activity, we kindly ask you to write a review about the experience and its host directly
            on the site. This review allows the nonprofit organisation to improve the experience, and it also allows
            other customers to select the best possible experience.
          </p>
          <p>
            You are always welcome to reach out to the Goodwings Experiences team if you have further questions or
            concerns about one of our partners.
          </p>
        </div>
      </div>

      <div className={css.contentWrapper}>
        <div className={css.contentSide}>
          <p>How does Goodwings Experiences make money?</p>
        </div>
        <div className={css.contentMain}>
          <p>
            We charge an annual subscription fee for travel agencies/tour operators to access the experiences. For every
            experience booked, we charge a 10% service fee, which enables us to run this marketplace
          </p>
        </div>
      </div>

      <div className={css.contentWrapper}>
        <div className={css.contentSide}>
          <p>Where do I find my receipts or itinerary for my experience?</p>
        </div>
        <div className={css.contentMain}>
          <p>
            Once the booking is confirmed and accepted by the nonprofit host, the Goodwings Experiences team will send
            you a confirmation email containing all the relevant information regarding the booking - including the
            receipt and the itinerary.
          </p>
        </div>
      </div>

      <div className={css.contentWrapper}>
        <div className={css.contentSide}>
          <p>Do I get a refund if I cancel my booking?</p>
        </div>
        <div className={css.contentMain}>
          <p>
            If you cancel the booking more than 7 business days before the date of the experience, you will get a full
            refund of the experience. However, if you cancel 6 or fewer business days before the date of the experience,
            you are only entitled to a refund of 50% of the experience’s price.
          </p>
        </div>
      </div>

      <div className={css.contentWrapper}>
        <div className={css.contentSide}>
          <p>What happens if the Nonprofit host cancel my booking?</p>
        </div>
        <div className={css.contentMain}>
          <p>
            If an NGO cancels an Experience within 4 weeks prior to the date of the Experience, the NGO shall use its
            best efforts to organize a similar Experience acceptable for the Travel Agent. If the NGO and Travel Agent
            do not agree on a different Experience, the NGO shall pay 50 % of the price for the cancelled Experience for
            the undelivered Experience.
          </p>
          <p>
            If an NGO cancels an Experience within 2 weeks prior to the date of the Experience, and the NGO and Travel
            Agent do not agree on a different Experience, the NGO shall pay the full price of the Experience to the
            Travel Agent for the undelivered Experience. Same rule shall apply for Experiences that are booked within 2
            weeks prior to the date of the Experience.
          </p>
        </div>
      </div>

      <div className={css.contentWrapper}>
        <div className={css.contentSide}>
          <p>How do I get a refund?</p>
        </div>
        <div className={css.contentMain}>
          <p>
            The money will be transferred back to your selected payment method.
          </p>
        </div>
      </div>

      <div className={css.contentWrapper}>
        <div className={css.contentSide}>
          <p>How do I cancel my booking?</p>
        </div>
        <div className={css.contentMain}>
          <p>
            You can find your booking in your inbox. From here, you can cancel the booking.
          </p>
        </div>
      </div>

    </div>
  );

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
          <TopbarContainer/>
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
                Goodwings Experiences is an online marketplace for social impact activities all over the world. The
                activities (or “experiences”) are hosted by nonprofit organisations.
              </p>
            </div>
          </div>

          <div className={css.contentWrapper}>

            <div className={css.contentSide}>
              <p>How does Goodwings Experiences work?</p>
            </div>

            <div className={css.contentMain}>
              <p>
                Nonprofit organisations add their social impact activities to the marketplace. Travel agencies/tour
                operators – as well as other travellers looking for authentic experiences – can inquire about the posted
                activities and book them directly through the marketplace by making a secure payment via bank account or
                an international credit card.
              </p>
            </div>
          </div>

          <div className={css.contentWrapper}>
            <div className={css.contentSide}>
              <p>Who receives the money?</p>
            </div>

            <div className={css.contentMain}>

              <p>
                The price of any given experience on the marketplace consists of the amount paid to the nonprofit
                organisation (the experience host) and a 10% service fee to Goodwings. There are no hidden fees.
              </p>
              <p>
                For example, if an experience costs USD 500, the nonprofit organisation who hosts the experience
                receives this amount. On top of that, we add a 10% service fee paid by the customer. This fee makes the
                marketplace possible. In this example, the total price paid by the customer will be USD 550.
              </p>
              <p>
                Goodwings handles everything relating to the secure payment.
              </p>
            </div>
          </div>

          <div className={css.contentWrapper}>

            <div className={css.contentSide}>
              <p>What is Goodwings?</p>
            </div>

            <div className={css.contentMain}>

              <p>
                Goodwings is a Danish company. We run <a href="www.goodwings.com">www.goodwings.com</a> – a hotel
                booking platform focused on for
                corporate travel where every booking results in a donation to a charity
              </p>
              <p>
                Instead of relying on mass media like other large hotel booking sites, our message is spread via social
                media and our charities. The money we save on marketing is given to these charities, who use it to fund
                their projects. That's how we're turning the travel industry into a force for positive and sustainable
                change. One hotel at a time.
              </p>
              <p>
                <a href="https://www.goodwings.com/en-us/about-us/vision-mission">Read more about us.</a>
              </p>
            </div>
          </div>

          {isNGO ? NGOFaq : null}
          {isLogged ? null : notLoggedFaq}
          {isLogged && !isNGO ? agentFaq : null}

          <p>Can’t find your answer? Contact the Goodwings Experiences team on&nbsp;
            <a href="mailto:hello@gwexperiences.com">hello@gwexperiences.com</a> or call&nbsp;<a
              href="tel:+ 45 60 73 74 75.">+45 60 73 74 75.</a></p>


        </LayoutWrapperMain>

        <LayoutWrapperFooter>
          <Footer/>
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

const mapStateToProps = state => {

  return {
    currentUser: state.user.currentUser,
  };
};

export default connect(mapStateToProps)(FAQPage);
