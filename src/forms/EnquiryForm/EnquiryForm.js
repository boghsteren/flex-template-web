import React from "react";
import { string, bool } from "prop-types";
import { compose } from "redux";
import { FormattedMessage, injectIntl, intlShape } from "react-intl";
import { Form as FinalForm } from "react-final-form";
import classNames from "classnames";
import {
  Form,
  PrimaryButton,
  FieldTextInput,
  IconEnquiry
} from "../../components";
import * as validators from "../../util/validators";
import { propTypes } from "../../util/types";

import css from "./EnquiryForm.css";

const EnquiryFormComponent = props => (
  <FinalForm
    {...props}
    render={fieldRenderProps => {
      const {
        rootClassName,
        className,
        submitButtonWrapperClassName,
        formId,
        handleSubmit,
        inProgress,
        intl,
        listingTitle,
        authorDisplayName,
        sendEnquiryError,
        organisation,
        listingContactNumber,
        listingContactName,
      } = fieldRenderProps;

      const messageLabel1 = intl.formatMessage({
        id: "EnquiryForm.messageLabel1"
      });
      const messageLabel2 = intl.formatMessage({
        id: "EnquiryForm.messageLabel1"
      });
      const messageLabel3 = intl.formatMessage({
        id: "EnquiryForm.messageLabel1"
      });
      const messageLabel = <FormattedMessage
        id="EnquiryForm.messageLabel"
        values={{
          authorDisplayName,
          organisation,
          boldText: (<strong>{messageLabel1}, {messageLabel2}, {messageLabel3}</strong>)
        }}
      />;
      const messagePlaceholder = intl.formatMessage(
        {
          id: "EnquiryForm.messagePlaceholder"
        },
        { authorDisplayName, organisation }
      );
      const messageRequiredMessage = intl.formatMessage({
        id: "EnquiryForm.messageRequired"
      });
      const messageRequired = validators.requiredAndNonEmptyString(
        messageRequiredMessage
      );

      const classes = classNames(rootClassName || css.root, className);
      const submitInProgress = inProgress;
      const submitDisabled = submitInProgress;

      const showContactLine =
        listingContactNumber &&
        listingContactName &&
        listingContactNumber.length > 0 &&
        listingContactName.length > 0;

      return (
        <Form className={classes} onSubmit={handleSubmit}>
          <IconEnquiry className={css.icon} />
          <h2 className={css.heading}>
            <FormattedMessage
              id="EnquiryForm.heading"
              values={{
                listingTitle: (<span className={css.teal}>{listingTitle}</span>),
                organisation: (<span className={css.teal}>{organisation}</span>)
              }}
            />
          </h2>
          <FieldTextInput
            className={css.field}
            type="textarea"
            name="message"
            id={formId ? `${formId}.message` : "message"}
            label={messageLabel}
            placeholder={messagePlaceholder}
            validate={messageRequired}
          />
          <div>
            {
              showContactLine ? (
                <div className={css.contactLine}>
                  <FormattedMessage id="EnquiryForm.contactLine" values={{
                    listingContactName: (<span className={css.authorName}>{listingContactName}</span>),
                    listingContactNumber: (<a href={`tel:${listingContactNumber}`}>{listingContactNumber}</a>),
                    organisation: (<span className={css.organisation}>{organisation}</span>),
                  }} />
                </div>
              ) : null
            }
          </div>
          <div className={submitButtonWrapperClassName}>
            {sendEnquiryError ? (
              <p className={css.error}>
                <FormattedMessage id="EnquiryForm.sendEnquiryError" />
              </p>
            ) : null}
            <PrimaryButton
              type="submit"
              inProgress={submitInProgress}
              disabled={submitDisabled}
            >
              <FormattedMessage id="EnquiryForm.submitButtonText" />
            </PrimaryButton>
          </div>
        </Form>
      );
    }}
  />
);

EnquiryFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  submitButtonWrapperClassName: null,
  inProgress: false,
  sendEnquiryError: null
};

EnquiryFormComponent.propTypes = {
  rootClassName: string,
  className: string,
  submitButtonWrapperClassName: string,

  inProgress: bool,

  listingTitle: string.isRequired,
  authorDisplayName: string.isRequired,
  sendEnquiryError: propTypes.error,

  listingContactName: string,
  listingContactNumber: string,

  // from injectIntl
  intl: intlShape.isRequired
};

const EnquiryForm = compose(injectIntl)(EnquiryFormComponent);

EnquiryForm.displayName = "EnquiryForm";

export default EnquiryForm;
