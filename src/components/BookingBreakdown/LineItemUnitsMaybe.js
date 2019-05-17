import React from "react";
import { FormattedMessage } from "react-intl";
import { propTypes } from "../../util/types";

import css from "./BookingBreakdown.css";

const LineItemUnitsMaybe = props => {
  const { transaction, unitType } = props;
  const quantity =
    unitType === "quantity" &&  transaction.attributes.lineItems[0]
      ? transaction.attributes.lineItems[0].quantity
      : transaction.attributes.protectedData.seats;
  const quantityUnit =
    unitType === "quantity"
      ? "BookingBreakdown.quantityUnitQuantity"
      : "BookingBreakdown.quantityUnitSeats";
  return (
    <div className={css.lineItem}>
      <span className={css.itemLabel}>
        <FormattedMessage id={quantityUnit} />
      </span>
      <span className={css.itemValue}>
        <FormattedMessage
          id="BookingBreakdown.quantity"
          values={{ quantity }}
        />
      </span>
    </div>
  );
};

LineItemUnitsMaybe.propTypes = {
  transaction: propTypes.transaction.isRequired
};

export default LineItemUnitsMaybe;
