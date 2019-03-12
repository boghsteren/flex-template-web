import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import {
  ModalInMobile,
  Button,
  PrimaryButton,
  Form,
  FieldTextInput,
  FieldSelect,
  Modal
} from "../../components";
import classNames from 'classnames';
import { Form as FinalForm } from 'react-final-form';
import * as validators from "../../util/validators";
import config from '../../config';

import css from "./ListingPage.css";

// This defines when ModalInMobile shows content as Modal
const MODAL_BREAKPOINT = 1023;

const ContactEmailForm = props => {
  return (
    <FinalForm
      {...props}
      render={fieldRenderProps => {
        const {
          rootClassName,
          className,
          form,
          values,
          handleSubmit,
          intl,
          sendContactEmailInProgress,
          sendContactEmailSuccess,
          sendContactEmailError,
        } = fieldRenderProps;

        if (sendContactEmailSuccess) {
          // form.change('contactEmail.fullName', '');
          // form.change('contactEmail.email', '');
          form.change('contactEmail.numberPeople', null);
          form.change('contactEmail.whereAreYouTravelingFrom', null);
          form.change('contactEmail.typeOfGroup', null);
          form.change('contactEmail.moreOffer', null);
          form.change('contactEmail.message', null);
        }

        const classes = classNames(rootClassName || css.rootClassNameContactEmailForm, className)

        //FullName
        const fullNameLabel = intl.formatMessage({
          id: "ListingPage.getInTouchNameLabel"
        });
        const fullNamePlaceholder = intl.formatMessage({
          id: "ListingPage.getInTouchNamePlaceholder"
        });
        const fullNameRequiredMessage = intl.formatMessage({
          id: "ListingPage.getInTouchNameRequired"
        });
        const fullNameRequired = validators.required(fullNameRequiredMessage);

        //Email
        const emailLabel = intl.formatMessage({
          id: "ListingPage.getInTouchEmailLabel"
        });
        const emailPlaceholder = intl.formatMessage({
          id: "ListingPage.getInTouchEmailPlaceholder"
        });
        const emailRequiredMessage = intl.formatMessage({
          id: "ListingPage.getInTouchEmailRequired"
        });
        const emailRequired = validators.required(emailRequiredMessage);
        const emailInvalidMessage = intl.formatMessage({
          id: "ListingPage.getInTouchEmailInvalid"
        });
        const emailValid = validators.emailFormatValid(emailInvalidMessage);

        //Number of people
        const numberPeopleLabel = intl.formatMessage({
          id: "ListingPage.getInTouchNumberPeopleLabel"
        });
        const numberPeoplePlaceholder = intl.formatMessage({
          id: "ListingPage.getInTouchNumberPeoplePlaceholder"
        });

        //Where are you traveling from
        const WAYTFLabel = intl.formatMessage({
          id: "ListingPage.getInTouchWAYTFLabel"
        });
        const WAYTFPlaceholder = intl.formatMessage({
          id: "ListingPage.getInTouchWAYTFPlaceholder"
        });

        //Type of group
        const TOGLabel = intl.formatMessage({
          id: "ListingPage.getInTouchTOGLabel"
        });
        const TOGDefaultOption = intl.formatMessage({
          id: "ListingPage.getInTouchTOGDefaultOption"
        });

        //More offer
        const moreOfferLabel = intl.formatMessage({
          id: "ListingPage.getInTouchMoreOfferLabel"
        });
        const moreOfferDefaultOption = intl.formatMessage({
          id: "ListingPage.getInTouchMoreOfferDefaultOption"
        });

        //Message
        const messageLabel = intl.formatMessage({
          id: "ListingPage.getInTouchMessageLabel"
        });
        const messagePlaceholder = intl.formatMessage({
          id: "ListingPage.getInTouchMessagePlaceholder"
        });

        return (
          <Form onSubmit={handleSubmit} className={classes}>

            <div className={css.fieldSet}>
              <label className={css.contactEmailLabel}>
                <FormattedMessage id="ListingPage.getInTouchNameEmail" />
              </label>
              <FieldTextInput
                id="contactEmail.fullName"
                name="contactEmail.fullName"
                type="text"
                inputClassName={css.contactEmailInput}
                className={css.contactEmailInputField}
                autoComplete="given-name"
                label={fullNameLabel}
                placeholder={fullNamePlaceholder}
                validate={fullNameRequired}
              />
              <FieldTextInput
                id="contactEmail.email"
                name="contactEmail.email"
                type="email"
                inputClassName={css.contactEmailInput}
                className={css.contactEmailInputField}
                autoComplete="email"
                label={emailLabel}
                placeholder={emailPlaceholder}
                validate={validators.composeValidators(emailRequired, emailValid)}
              />
            </div>

            <div className={classNames(css.fieldSet, css.getInTouchMoreAboutYou)}>
              <label className={css.contactEmailLabel}>
                <FormattedMessage id="ListingPage.getInTouchMoreAboutYou" />
              </label>
              <FieldTextInput
                id="contactEmail.numberPeople"
                name="contactEmail.numberPeople"
                type="number"
                inputClassName={css.contactEmailInput}
                className={classNames(css.contactEmailInputField, css.twoColInput)}
                label={numberPeopleLabel}
                placeholder={numberPeoplePlaceholder}
              />
              <FieldTextInput
                id="contactEmail.whereAreYouTravelingFrom"
                name="contactEmail.whereAreYouTravelingFrom"
                type="text"
                inputClassName={css.contactEmailInput}
                className={classNames(css.contactEmailInputField, css.twoColInput)}
                label={WAYTFLabel}
                placeholder={WAYTFPlaceholder}
              />
              <FieldSelect
                id="contactEmail.typeOfGroup"
                name="contactEmail.typeOfGroup"
                label={TOGLabel}
                className={css.contactEmailInputField}
              >
                <option disabled selected value="">
                  {TOGDefaultOption}
                </option>
                {config.custom.typeOfGroupContactEmail.map(type => (
                  <option value={type.key} key={type.key}>
                    {type.label}
                  </option>
                ))}
              </FieldSelect>
            </div>
            <div className={css.fieldSet}>
              <label className={css.contactEmailLabel}>
                <FormattedMessage id="ListingPage.getInTouchMoreAboutUs" />
              </label>
              <FieldSelect
                id="contactEmail.moreOffer"
                name="contactEmail.moreOffer"
                label={moreOfferLabel}
                className={css.contactEmailInputField}
              >
                <option className={css.contactEmailSelectDefaultOption} disabled={true} selected={true} value="">
                  {moreOfferDefaultOption}
                </option>
                {config.custom.moreOfferContactEmail.map(type => (
                  <option value={type.key} key={type.label}>
                    {type.label}
                  </option>
                ))}
              </FieldSelect>
              <FieldTextInput
                id="contactEmail.message"
                name="contactEmail.message"
                type="textarea"
                inputClassName={css.contactEmailInput}
                className={css.contactEmailInputField}
                label={messageLabel}
                placeholder={messagePlaceholder}
              />
            </div>

            {sendContactEmailError ? 
              <div className={css.error}>
                {sendContactEmailError.message ? 
                  sendContactEmailError.message 
                  : <FormattedMessage id="ListingPage.getInTouchGeneralError" />}
              </div> 
              : null}

            <PrimaryButton
              className={css.contactEmailSubmit}
              type="submit"
              inProgress={sendContactEmailInProgress}
              disabled={sendContactEmailInProgress}
            >
              <FormattedMessage id="ListingPage.getInTouchSubmit" />
            </PrimaryButton>

          </Form>
        )
      }}
    />
  )
}

class SectionContactEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  handleSubmitContactEmail = (data) => {
    const { fullName, email, numberPeople, whereAreYouTravelingFrom,
      typeOfGroup, moreOffer, message } = data.contactEmail;
    const receiver = null;
    const subject = `Guest Booking Contact - ${fullName}`;
    const content = `
      Full name: ${fullName}\r\n
      Email: ${email}\r\n
      --------------------------------\r\n
      Number of people: ${numberPeople ? numberPeople : ''}\r\n
      Where are you traveling from: ${whereAreYouTravelingFrom ? whereAreYouTravelingFrom : ''}\r\n
      Type of group: ${typeOfGroup ? typeOfGroup : ''}\r\n
      --------------------------------\r\n
      I would like a non-committal offer for my group travel (accommodation, flights, etc.): ${moreOffer ? moreOffer : ''}\r\n
      Message: ${message ? message : ''}\r\n
    `;
    this.props.onSendContactEmail(receiver, subject, content);
  }

  render() {
    const {
      intl,
      listing,
      isContactEmail,
      richTitle,
      handleContactEmailButtonClick,
      handleMobileContactEmailModalClose,
      onManageDisableScrolling,
      onSendContactEmail,
      onSendContactEmailReset,
      sendContactEmailInProgress,
      sendContactEmailSuccess,
      sendContactEmailError
    } = this.props;

    return (
      <div>
        <ModalInMobile
          className={css.modalInMobile}
          containerClassName={classNames(css.modalContainer, css.longModalContainer)}
          id="BookingDatesFormInModal"
          isModalOpenOnMobile={isContactEmail}
          onClose={handleMobileContactEmailModalClose}
          showAsModalMaxWidth={MODAL_BREAKPOINT}
          onManageDisableScrolling={onManageDisableScrolling}
        >
          <div className={classNames(css.modalHeading, css.modalContactUsHeading)}>
            <h1 className={css.title}>{richTitle}</h1>
          </div>

          <div className={classNames(css.bookingHeading, css.contactEmailBookingHeading)}>
            <h2 className={css.bookingTitle}>
              {<FormattedMessage
                id="ListingPage.contactEmailTitle"
              />}
            </h2>
          </div>
          <div>
            <ContactEmailForm
              intl={intl}
              sendContactEmailInProgress={sendContactEmailInProgress}
              sendContactEmailSuccess={sendContactEmailSuccess}
              sendContactEmailError={sendContactEmailError}
              onSubmit={(values) => {
                this.handleSubmitContactEmail(values)
              }}
            />
          </div>
        </ModalInMobile>
        <div className={css.openBookingForm}>
          <Button
            rootClassName={css.bookButton}
            onClick={handleContactEmailButtonClick}
          >
            <FormattedMessage id="ListingPage.ctuButtonMessage" />
          </Button>
        </div>
        <Modal
          id="ListingPage.getInTouchSuccessModal"
          isOpen={sendContactEmailSuccess}
          onClose={() => {
            onSendContactEmailReset()
          }}
          onManageDisableScrolling={onManageDisableScrolling}
          className={css.getInTouchSuccessModal}
        >
          <div css={css.getInTouchSuccessModalContent}>
            <div className={css.getInTouchSuccessModalContentTitle}>
              <FormattedMessage id="ListingPage.getInTouchSuccessModalContentTitle" />
            </div>
            <p className={css.getInTouchSuccessModalContentPara}>
              <FormattedMessage id="ListingPage.getInTouchSuccessModalContentPara1" />              
            </p>
            <p className={css.getInTouchSuccessModalContentPara}>
              <FormattedMessage id="ListingPage.getInTouchSuccessModalContentPara2" />              
            </p>
          </div>
        </Modal>
      </div>
    );
  }
}

export default SectionContactEmail;
