import React from "react";
import { required } from "../../util/validators";
import { FieldSelect } from "../../components";

import css from "./EditListingPricingForm.css";

const PricingSchemeSelectFieldMaybe = props => {
  const { name, id, categories, intl } = props;
  const categoryLabel = intl.formatMessage({
    id: "EditListingPricingForm.schemeLabel"
  });
  const categoryPlaceholder = intl.formatMessage({
    id: "EditListingPricingForm.schemePlaceholder"
  });
  const categoryRequired = required(
    intl.formatMessage({
      id: "EditListingPricingForm.schemeRequired"
    })
  );
  return categories ? (
    <FieldSelect
      className={css.scheme}
      name={name}
      id={id}
      label={categoryLabel}
      validate={categoryRequired}
    >
      <option value="">{categoryPlaceholder}</option>
      {categories.map(c => (
        <option key={c.key} value={c.key}>
          {c.label}
        </option>
      ))}
    </FieldSelect>
  ) : null;
};

export default PricingSchemeSelectFieldMaybe;
