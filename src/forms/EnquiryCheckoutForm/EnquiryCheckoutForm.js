import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import classNames from 'classnames';
import { Form, PrimaryButton, ExpandingTextarea } from '../../components';
import * as log from '../../util/log';
import config from '../../config';

import css from './EnquiryCheckoutForm.css';

const initialState = {
  error: null,
  submitting: false,
  cardValueValid: false,
  token: null,
  message: '',
};

/**
 * Payment form that asks for credit card info using Stripe Elements.
 *
 * When the card is valid and the user submits the form, a request is
 * sent to the Stripe API to fetch a token that is passed to the
 * onSubmit prop of this form.
 *
 * See: https://stripe.com/docs/elements
 */
class EnquiryCheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { onSubmit } = this.props;
    onSubmit({ token: 'enquiry', message: this.state.message.trim() });
  }

  render() {
    const {
      className,
      rootClassName,
      inProgress,
      formId,
      paymentInfo,
      onChange,
      authorDisplayName,
      intl,
    } = this.props;
    const submitInProgress = this.state.submitting || inProgress;
    const submitDisabled = submitInProgress;
    const classes = classNames(rootClassName || css.root, className);
    
    const messagePlaceholder = intl.formatMessage(
      { id: 'StripePaymentForm.messagePlaceholder' },
      { name: authorDisplayName }
    );

    const handleMessageChange = e => {
      // A change in the message should call the onChange prop with
      // the current token and the new message.
      const message = e.target.value;
      this.setState(prevState => {
        const { token } = prevState;
        const newState = { token, message };
        onChange(newState);
        return newState;
      });
    };

    const messageOptionalText = (
      <span className={css.messageOptional}>
        <FormattedMessage id="StripePaymentForm.messageOptionalText" />
      </span>
    );

    return (
      <Form className={classes} onSubmit={this.handleSubmit}>
        <h3 className={css.messageHeading}>
          <FormattedMessage id="StripePaymentForm.messageHeading" />
        </h3>
        <ExpandingTextarea
          id={`${formId}-message`}
          className={css.message}
          placeholder={messagePlaceholder}
          value={this.state.message}
          onChange={handleMessageChange}
        />
        <div className={css.submitContainer}>
          <PrimaryButton
            className={css.submitButton}
            type="submit"
            inProgress={submitInProgress}
            disabled={submitDisabled}
          >
            <FormattedMessage id="StripePaymentForm.submitEnquiryPaymentInfo" />
          </PrimaryButton>
        </div>
      </Form>
    );
  }
}

EnquiryCheckoutForm.defaultProps = {
  className: null,
  rootClassName: null,
  inProgress: false,
  onChange: () => null,
};

const { bool, func, string } = PropTypes;

EnquiryCheckoutForm.propTypes = {
  className: string,
  rootClassName: string,
  inProgress: bool,
  formId: string.isRequired,
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  onChange: func,
  paymentInfo: string.isRequired,
  authorDisplayName: string.isRequired,
};

export default injectIntl(EnquiryCheckoutForm);
