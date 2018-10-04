import React from "react";
import { required } from "../../util/validators";
import { FieldSelect } from "../../components";

import css from "./EditListingDescriptionForm.css";

const CustomCategorySelectFieldMaybe = props => {
  const { name, id, categories, intl } = props;
  const categoryLabel =
    id === "category"
      ? intl.formatMessage({
          id: "EditListingDescriptionForm.categoryLabel"
        })
      : intl.formatMessage({
          id: "EditListingDescriptionForm.group_sizeLabel"
        });
  const categoryPlaceholder =
    id === "category"
      ? intl.formatMessage({
          id: "EditListingDescriptionForm.categoryPlaceholder"
        })
      : intl.formatMessage({
          id: "EditListingDescriptionForm.group_sizePlaceholder"
        });
  const categoryRequired =
    id === "category"
      ? required(
          intl.formatMessage({
            id: "EditListingDescriptionForm.categoryRequired"
          })
        )
      : required(
          intl.formatMessage({
            id: "EditListingDescriptionForm.group_sizeRequired"
          })
        );
  return categories ? (
    <FieldSelect
      className={css.category}
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

export default CustomCategorySelectFieldMaybe;
