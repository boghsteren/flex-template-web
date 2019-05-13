import React from "react";
import { FormattedMessage, intlShape } from "react-intl";
import { formatMoney } from "../../util/currency";
import { propTypes } from "../../util/types";

import css from "./BookingBreakdown.css";

const LineItemUnitPrice = props => {
  const { transaction, unitType, intl } = props;
  const isGroupSeats = unitType === "group_seats";
  const isPersonSeats = unitType === "person_seats";
  const translationKey = isGroupSeats
    ? "BookingBreakdown.pricePerGroup"
    : "BookingBreakdown.pricePerPerson";

  const unitPurchase = transaction.attributes.lineItems.find(
    item => item.code === "line-item/units" && !item.reversal
  );

  if (!unitPurchase) {
    return null;
    throw new Error(`LineItemUnitPrice: lineItem (${unitType}) missing`);
  }

  const formattedUnitPrice = formatMoney(intl, unitPurchase.unitPrice);

  return (
    <div className={css.lineItem}>
      <span className={css.itemLabel}>
        <FormattedMessage id={translationKey} />
      </span>
      <span className={css.itemValue}>{formattedUnitPrice}</span>
    </div>
  );
};

LineItemUnitPrice.propTypes = {
  transaction: propTypes.transaction.isRequired,
  intl: intlShape.isRequired
};

export default LineItemUnitPrice;
