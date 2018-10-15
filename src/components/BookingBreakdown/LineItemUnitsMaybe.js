import React from "react";
import { FormattedMessage } from "react-intl";
import { propTypes } from "../../util/types";

import css from "./BookingBreakdown.css";

const LineItemUnitsMaybe = props => {
  const { transaction, unitType } = props;

  const quantity =
    unitType === "seats"
      ? transaction.attributes.protectedData.seats
      : transaction.attributes.protectedData.hours;
  const quantityUnit =
    unitType === "seats"
      ? "BookingBreakdown.quantityUnitSeats"
      : "BookingBreakdown.quantityUnitHours";
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
