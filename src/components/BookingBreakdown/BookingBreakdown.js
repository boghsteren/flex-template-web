/**
 * This component will show the booking info and calculated total price.
 * I.e. dates and other details related to payment decision in receipt format.
 */
import React from "react";
import { oneOf, string } from "prop-types";
import { FormattedMessage, intlShape, injectIntl } from "react-intl";
import classNames from "classnames";
import {
  propTypes,
  LINE_ITEM_CUSTOMER_COMMISSION,
  LINE_ITEM_PROVIDER_COMMISSION
} from "../../util/types";
import { formatMoney } from "../../util/currency";

import LineItemUnitPrice from "./LineItemUnitPrice";
import LineItemBookingPeriod from "./LineItemBookingPeriod";
import LineItemUnitsMaybe from "./LineItemUnitsMaybe";
import LineItemSubTotalMaybe from "./LineItemSubTotalMaybe";
import LineItemCustomerCommissionMaybe from "./LineItemCustomerCommissionMaybe";
import LineItemCustomerCommissionRefundMaybe from "./LineItemCustomerCommissionRefundMaybe";
import LineItemProviderCommissionRefundMaybe from "./LineItemProviderCommissionRefundMaybe";
import LineItemRefundMaybe from "./LineItemRefundMaybe";
import LineItemTotalPrice from "./LineItemTotalPrice";
import css from "./BookingBreakdown.css";

export const BookingBreakdownComponent = props => {
  const {
    rootClassName,
    className,
    userRole,
    unitType,
    transaction,
    booking,
    intl,
    listing
  } = props;

  const isCustomer = userRole === "customer";
  const isProvider = userRole === "provider";

  const hasCommissionLineItem = transaction.attributes.lineItems.find(item => {
    const hasCustomerCommission =
      isCustomer && item.code === LINE_ITEM_CUSTOMER_COMMISSION;
    const hasProviderCommission =
      isProvider && item.code === LINE_ITEM_PROVIDER_COMMISSION;
    return (hasCustomerCommission || hasProviderCommission) && !item.reversal;
  });
  const pricing_scheme =
    listing && listing.attributes.publicData.pricing_scheme;

  const organisation =
    listing &&
    listing.author.attributes.profile.publicData &&
    listing.author.attributes.profile.publicData.organisation;
  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <LineItemBookingPeriod
        transaction={transaction}
        hourly
        booking={booking}
        unitType={unitType}
      />
      <LineItemUnitPrice
        transaction={transaction}
        unitType={transaction.attributes.protectedData.pricing_scheme}
        intl={intl}
      />
      <LineItemUnitsMaybe transaction={transaction} unitType={"quantity"} />
      <LineItemUnitsMaybe transaction={transaction} unitType={"seats"} />

      <LineItemSubTotalMaybe
        transaction={transaction}
        unitType={unitType}
        userRole={userRole}
        intl={intl}
      />
      <LineItemRefundMaybe
        transaction={transaction}
        unitType={unitType}
        intl={intl}
      />

      <LineItemCustomerCommissionMaybe
        transaction={transaction}
        isCustomer={isCustomer}
        intl={intl}
      />
      <LineItemCustomerCommissionRefundMaybe
        transaction={transaction}
        isCustomer={isCustomer}
        intl={intl}
      />

      <LineItemProviderCommissionRefundMaybe
        transaction={transaction}
        isProvider={isProvider}
        intl={intl}
      />

      <hr className={css.totalDivider} />
      <LineItemTotalPrice
        transaction={transaction}
        isProvider={isProvider}
        intl={intl}
      />
      {hasCommissionLineItem ? (
        <span className={css.impactInfo}>
          <FormattedMessage
            id="BookingBreakdown.impactNote"
            values={{
              formattedSubTotal: formatMoney(
                intl,
                transaction.attributes.payoutTotal
              ),
              organisation
            }}
          />
        </span>
      ) : null}
    </div>
  );
};

BookingBreakdownComponent.defaultProps = {
  rootClassName: null,
  className: null
};

BookingBreakdownComponent.propTypes = {
  rootClassName: string,
  className: string,

  userRole: oneOf(["customer", "provider"]).isRequired,
  unitType: propTypes.bookingUnitType.isRequired,
  transaction: propTypes.transaction.isRequired,
  booking: propTypes.booking.isRequired,
  // from injectIntl
  intl: intlShape.isRequired
};

const BookingBreakdown = injectIntl(BookingBreakdownComponent);

BookingBreakdown.displayName = "BookingBreakdown";

export default BookingBreakdown;
