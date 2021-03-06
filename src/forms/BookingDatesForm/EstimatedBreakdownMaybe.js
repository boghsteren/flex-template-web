/**
 * Booking breakdown estimation
 *
 * Transactions have payment information that can be shown with the
 * BookingBreakdown component. However, when selecting booking
 * details, there is no transaction object present and we have to
 * estimate the breakdown of the transaction without data from the
 * API.
 *
 * If the payment process of a customized marketplace is something
 * else than simply daily or nightly bookings, the estimation will
 * most likely need some changes.
 *
 * To customize the estimation, first change the BookingDatesForm to
 * collect all booking information from the user (in addition to the
 * default date pickers), and provide that data to the
 * EstimatedBreakdownMaybe components. You can then make customization
 * within this file to create a fake transaction object that
 * calculates the breakdown information correctly according to the
 * process.
 *
 * In the future, the optimal scenario would be to use the same
 * transactions.initiateSpeculative API endpoint as the CheckoutPage
 * is using to get the breakdown information from the API, but
 * currently the API doesn't support that for logged out users, and we
 * are forced to estimate the information here.
 */
import React from "react";
import moment from "moment";
import Decimal from "decimal.js";
import { types as sdkTypes } from "../../util/sdkLoader";
import {
  dateFromLocalToAPI,
  nightsBetween,
  daysBetween
} from "../../util/dates";
import {
  LINE_ITEM_NIGHT,
  LINE_ITEM_UNITS,
  TRANSITION_REQUEST,
  TX_TRANSITION_ACTOR_CUSTOMER,
  LINE_ITEM_DAY,
  LINE_ITEM_CUSTOMER_COMMISSION
} from "../../util/types";
import {
  unitDivisor,
  convertMoneyToNumber,
  convertUnitToSubUnit
} from "../../util/currency";
import { BookingBreakdown } from "../../components";
import config from '../../config'

import css from "./BookingDatesForm.css";

const { Money, UUID } = sdkTypes;

const estimatedTotalPrice = (unitPrice, unitCount) => {
  const numericPrice = convertMoneyToNumber(unitPrice);
  const numericTotalPrice = new Decimal(numericPrice)
    .times(unitCount)
    .toNumber();
  return new Money(
    convertUnitToSubUnit(numericTotalPrice, unitDivisor(unitPrice.currency)),
    unitPrice.currency
  );
};

const estimatedTotalPriceWithCommmission = (unitPrice, unitCount) => {
  const numericPrice = convertMoneyToNumber(unitPrice);
  const numericTotalPrice = new Decimal(numericPrice)
    .times(unitCount)
    .toNumber();
  const numericTotalPriceWithCommission = numericTotalPrice + numericTotalPrice * config.customerCommissionPercentage;
  return new Money(
    convertUnitToSubUnit(numericTotalPriceWithCommission, unitDivisor(unitPrice.currency)),
    unitPrice.currency
  );
};

const estimatedCommission = (amount, currency, quantity) => {
  const percentage = config.customerCommissionPercentage;
  const estimatedCommission = amount * percentage * quantity;
  return new Money(estimatedCommission, currency);
}

// When we cannot speculatively initiate a transaction (i.e. logged
// out), we must estimate the booking breakdown. This function creates
// an estimated transaction object for that use case.
const estimatedTransaction = (
  unitType,
  bookingStart,
  bookingEnd,
  unitPrice,
  quantity,
  listing,
  hours,
  seats,
) => {
  const now = new Date();
  const isNightly = unitType === LINE_ITEM_NIGHT;
  const isDaily = unitType === LINE_ITEM_DAY;
  const unitCount = isNightly
    ? nightsBetween(bookingStart, bookingEnd)
    : isDaily
      ? daysBetween(bookingStart, bookingEnd) * seats * hours
      : quantity;

  const totalPrice = estimatedTotalPrice(unitPrice, unitCount);
  const totalPriceWithCommission = estimatedTotalPriceWithCommmission(unitPrice, unitCount);
  const customerCommisionPrice = estimatedCommission(unitPrice.amount, unitPrice.currency, unitCount);
  // bookingStart: "Fri Mar 30 2018 12:00:00 GMT-1100 (SST)" aka "Fri Mar 30 2018 23:00:00 GMT+0000 (UTC)"
  // Server normalizes night/day bookings to start from 00:00 UTC aka "Thu Mar 29 2018 13:00:00 GMT-1100 (SST)"
  // The result is: local timestamp.subtract(12h).add(timezoneoffset) (in eg. -23 h)

  // local noon -> startOf('day') => 00:00 local => remove timezoneoffset => 00:00 API (UTC)
  // const serverDayStart = dateFromLocalToAPI(
  //   moment(bookingStart)
  //     .startOf("day")
  //     .toDate()
  // );
  // const serverDayEnd = dateFromLocalToAPI(
  //   moment(bookingEnd)
  //     .startOf("day")
  //     .toDate()
  // );

  return {
    id: new UUID("estimated-transaction"),
    type: "transaction",
    attributes: {
      createdAt: now,
      lastTransitionedAt: now,
      lastTransition: TRANSITION_REQUEST,
      payinTotal: totalPriceWithCommission,
      payoutTotal: totalPrice,
      protectedData: {
        pricing_scheme: listing.attributes.publicData.pricing_scheme,
        // hours: hours,
        seats: seats,
      },
      lineItems: [
        {
          code: unitType,
          includeFor: ["customer", "provider"],
          unitPrice: unitPrice,
          quantity: new Decimal(unitCount),
          lineTotal: totalPrice,
          reversal: false
        },
        {
          code: LINE_ITEM_CUSTOMER_COMMISSION,
          includeFor: ["customer"],
          unitPrice: unitPrice,
          percentage: new Decimal(config.customerCommissionPercentage * 100),
          lineTotal: customerCommisionPrice,
          reversal: false
        }
      ],
      transitions: [
        {
          createdAt: now,
          by: TX_TRANSITION_ACTOR_CUSTOMER,
          transition: TRANSITION_REQUEST
        }
      ]
    },
    booking: {
      id: new UUID("estimated-booking"),
      type: "booking",
      attributes: {
        start: bookingStart,
        end: bookingEnd,
      }
    }
  };
};

const EstimatedBreakdownMaybe = props => {
  const { listing } = props;
  const {
    unitType,
    unitPrice,
    startDate,
    endDate,
    quantity,
    hours,
    seats,
  } = props.bookingData;
  const isUnits = unitType === LINE_ITEM_UNITS;
  const quantityIfUsingUnits = !isUnits || Number.isInteger(quantity);
  const canEstimatePrice =
    startDate && endDate && unitPrice && quantityIfUsingUnits;
  if (!canEstimatePrice) {
    return null;
  }

  // console.log({ bookingData: props.bookingData });

  const tx = estimatedTransaction(
    unitType,
    startDate,
    endDate,
    unitPrice,
    quantity,
    listing,
    hours,
    seats,
  );


  return (
    <BookingBreakdown
      className={css.receipt}
      userRole="customer"
      unitType={unitType}
      transaction={tx}
      listing={listing}
      booking={tx.booking}
    />
  );
};

export default EstimatedBreakdownMaybe;
