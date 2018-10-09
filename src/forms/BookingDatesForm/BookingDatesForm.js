import React, { Component } from "react";
import { string, bool, arrayOf } from "prop-types";
import { compose } from "redux";
import { Form as FinalForm } from "react-final-form";
import { FormattedMessage, intlShape, injectIntl } from "react-intl";
import classNames from "classnames";
import moment from "moment";
import {
  required,
  bookingDatesRequired,
  composeValidators,
  aboveZero
} from "../../util/validators";
import { propTypes } from "../../util/types";
import config from "../../config";
import {
  Form,
  PrimaryButton,
  FieldDateInput,
  FieldDateRangeInput,
  FieldTextInput
} from "../../components";
import EstimatedBreakdownMaybe from "./EstimatedBreakdownMaybe";

import css from "./BookingDatesForm.css";

export class BookingDatesFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { focusedInput: null };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.onFocusedInputChange = this.onFocusedInputChange.bind(this);
  }

  // Function that can be passed to nested components
  // so that they can notify this component when the
  // focused input changes.
  onFocusedInputChange(focusedInput) {
    this.setState({ focusedInput });
  }

  // In case start or end date for the booking is missing
  // focus on that input, otherwise continue with the
  // default handleSubmit function.
  handleFormSubmit(e) {
    this.props.onSubmit(e);
  }

  render() {
    const { rootClassName, className, price: unitPrice, ...rest } = this.props;
    const classes = classNames(rootClassName || css.root, className);

    if (!unitPrice) {
      return (
        <div className={classes}>
          <p className={css.error}>
            <FormattedMessage id="BookingDatesForm.listingPriceMissing" />
          </p>
        </div>
      );
    }
    if (unitPrice.currency !== config.currency) {
      return (
        <div className={classes}>
          <p className={css.error}>
            <FormattedMessage id="BookingDatesForm.listingCurrencyInvalid" />
          </p>
        </div>
      );
    }

    return (
      <FinalForm
        {...rest}
        unitPrice={unitPrice}
        onSubmit={this.handleFormSubmit}
        render={fieldRenderProps => {
          const {
            endDatePlaceholder,
            startDatePlaceholder,
            form,
            handleSubmit,
            intl,
            isOwnListing,
            listing,
            submitButtonWrapperClassName,
            unitPrice,
            unitType,
            values,
            timeSlots,
            fetchTimeSlotsError
          } = fieldRenderProps;
          const { startDate, endDate } =
            values && values.bookingDates ? values.bookingDates : {};
          const { seats } = (values && values.seats) || 1;

          const bookingStartLabel = intl.formatMessage({
            id: "BookingDatesForm.bookingStartTitle"
          });
          const bookingEndLabel = intl.formatMessage({
            id: "BookingDatesForm.bookingEndTitle"
          });
          const hoursLabel = intl.formatMessage({
            id: "BookingDatesForm.hoursLabel"
          });
          const hoursPlaceholder = intl.formatMessage({
            id: "BookingDatesForm.hoursPlaceholder"
          });
          const hoursRequiredMessage = intl.formatMessage({
            id: "BookingDatesForm.hoursRequiredMessage"
          });
          const seatsLabel = intl.formatMessage({
            id: "BookingDatesForm.seatsLabel"
          });
          const seatsPlaceholder = intl.formatMessage({
            id: "BookingDatesForm.seatsPlaceholder"
          });
          const seatsRequiredMessage = intl.formatMessage({
            id: "BookingDatesForm.seatsRequiredMessage"
          });
          const requiredMessage = intl.formatMessage({
            id: "BookingDatesForm.requiredDate"
          });
          const startDateErrorMessage = intl.formatMessage({
            id: "FieldDateRangeInput.invalidStartDate"
          });
          const endDateErrorMessage = intl.formatMessage({
            id: "FieldDateRangeInput.invalidEndDate"
          });
          const timeSlotsError = fetchTimeSlotsError ? (
            <p className={css.timeSlotsError}>
              <FormattedMessage id="BookingDatesForm.timeSlotsError" />
            </p>
          ) : null;

          // This is the place to collect breakdown estimation data. See the
          // EstimatedBreakdownMaybe component to change the calculations
          // for customized payment processes.
          const bookingData =
            startDate && endDate
              ? {
                  unitType,
                  unitPrice,
                  startDate,
                  endDate,
                  quantity: seats
                }
              : null;
          const bookingInfo = bookingData ? (
            <div className={css.priceBreakdownContainer}>
              <h3 className={css.priceBreakdownTitle}>
                <FormattedMessage id="BookingDatesForm.priceBreakdownTitle" />
              </h3>
              <EstimatedBreakdownMaybe bookingData={bookingData} />
            </div>
          ) : null;

          const dateFormatOptions = {
            weekday: "short",
            month: "short",
            day: "numeric"
          };

          const now = moment();
          const today = now.startOf("day").toDate();
          const tomorrow = now
            .startOf("day")
            .add(1, "days")
            .toDate();
          const startDatePlaceholderText =
            startDatePlaceholder || intl.formatDate(today, dateFormatOptions);
          const endDatePlaceholderText =
            endDatePlaceholder || intl.formatDate(tomorrow, dateFormatOptions);
          const submitButtonClasses = classNames(
            submitButtonWrapperClassName || css.submitButtonWrapper
          );
          // Display date range picker if listing is a "per day" listing
          // Display date picker if listing is a "per hour" listing
          // Display hour number input if listing a "per hour" listing
          // Display number of people input if listing is a "per person (either per hour or per day)" listing
          return (
            <Form onSubmit={handleSubmit} className={classes}>
              {timeSlotsError}

              {(listing.attributes.publicData.pricing_scheme === "daily_flat" ||
                listing.attributes.publicData.pricing_scheme ===
                  "daily_seats") && (
                <FieldDateRangeInput
                  className={css.bookingDates}
                  name="bookingDates"
                  unitType={unitType}
                  startDateId={`${form}.bookingStartDate`}
                  startDateLabel={bookingStartLabel}
                  startDatePlaceholderText={startDatePlaceholderText}
                  endDateId={`${form}.bookingEndDate`}
                  endDateLabel={bookingEndLabel}
                  endDatePlaceholderText={endDatePlaceholderText}
                  focusedInput={this.state.focusedInput}
                  onFocusedInputChange={this.onFocusedInputChange}
                  format={null}
                  timeSlots={timeSlots}
                  useMobileMargins
                  validate={composeValidators(
                    required(requiredMessage),
                    bookingDatesRequired(
                      startDateErrorMessage,
                      endDateErrorMessage
                    )
                  )}
                />
              )}
              {(listing.attributes.publicData.pricing_scheme ===
                "hourly_flat" ||
                listing.attributes.publicData.pricing_scheme ===
                  "hourly_seats") && (
                <div>
                  <FieldDateInput
                    className={css.bookingDates}
                    id="bookingDate"
                    name="bookingDate"
                    label="Booking date"
                    placeholderText={bookingStartLabel}
                    validate={composeValidators(required(requiredMessage))}
                    value={moment()}
                  />
                  <FieldTextInput
                    id="hours"
                    name="hours"
                    className={css.numberInput}
                    type="text"
                    min="0"
                    label={hoursLabel}
                    placeholder={hoursPlaceholder}
                    parse={value => {
                      return value.replace(/[^\d]/g, "");
                    }}
                    validate={composeValidators(
                      required(hoursRequiredMessage),
                      aboveZero(hoursRequiredMessage)
                    )}
                  />
                </div>
              )}
              {(listing.attributes.publicData.pricing_scheme ===
                "hourly_seats" ||
                listing.attributes.publicData.pricing_scheme ===
                  "daily_seats") && (
                <div>
                  <FieldTextInput
                    id="seats"
                    name="seats"
                    className={css.numberInput}
                    min="0"
                    type="text"
                    label={seatsLabel}
                    placeholder={seatsPlaceholder}
                    parse={value => {
                      return value.replace(/[^\d]/g, "");
                    }}
                    validate={composeValidators(
                      required(seatsRequiredMessage),
                      aboveZero(seatsRequiredMessage)
                    )}
                  />
                </div>
              )}
              {listing.attributes.publicData.pricing_scheme ===
                "hourly_seats" && <div />}

              {bookingInfo}
              <p className={css.smallPrint}>
                <FormattedMessage
                  id={
                    isOwnListing
                      ? "BookingDatesForm.ownListing"
                      : "BookingDatesForm.youWontBeChargedInfo"
                  }
                />
              </p>
              <div className={submitButtonClasses}>
                <PrimaryButton type="submit">
                  <FormattedMessage id="BookingDatesForm.requestToBook" />
                </PrimaryButton>
              </div>
            </Form>
          );
        }}
      />
    );
  }
}

BookingDatesFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  submitButtonWrapperClassName: null,
  price: null,
  isOwnListing: false,
  startDatePlaceholder: null,
  endDatePlaceholder: null,
  timeSlots: null
};

BookingDatesFormComponent.propTypes = {
  rootClassName: string,
  className: string,
  submitButtonWrapperClassName: string,

  unitType: propTypes.bookingUnitType.isRequired,
  price: propTypes.money,
  isOwnListing: bool,
  timeSlots: arrayOf(propTypes.timeSlot),

  // from injectIntl
  intl: intlShape.isRequired,

  // for tests
  startDatePlaceholder: string,
  endDatePlaceholder: string
};

const BookingDatesForm = compose(injectIntl)(BookingDatesFormComponent);
BookingDatesForm.displayName = "BookingDatesForm";

export default BookingDatesForm;
