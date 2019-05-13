import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { FormattedMessage } from "react-intl";
import { ensureOwnListing } from "../../util/data";
import { ListingLink } from "../../components";
import { EditListingDescriptionForm } from "../../forms";
import config from "../../config";

import css from "./EditListingDescriptionPanel.css";

const EditListingDescriptionPanel = props => {
  const {
    className,
    rootClassName,
    listing,
    onSubmit,
    onChange,
    submitButtonText,
    panelUpdated,
    updateInProgress,
    errors
  } = props;

  const classes = classNames(rootClassName || css.root, className);
  const currentListing = ensureOwnListing(listing);
  const { description, title, publicData } = currentListing.attributes;

  const panelTitle = currentListing.id ? (
    <FormattedMessage
      id="EditListingDescriptionPanel.title"
      values={{ listingTitle: <ListingLink listing={listing} /> }}
    />
  ) : (
      <FormattedMessage id="EditListingDescriptionPanel.createListingTitle" />
    );

  return (
    <div className={classes}>
      <h1 className={css.title}>{panelTitle}</h1>
      <EditListingDescriptionForm
        className={css.form}
        initialValues={{
          title,
          description,
          category: publicData.category,
          group_size: publicData.group_size_min && publicData.group_size_max ? [publicData.group_size_min, publicData.group_size_max] : [1, 31],
          contact: publicData.contact,
          included: publicData.included,
          duration: publicData.duration,
          contactName: publicData.contactName,
          contactEmail: publicData.contactEmail,
          contactNumber: publicData.contactNumber,
        }}
        saveActionMsg={submitButtonText}
        onSubmit={values => {
          const {
            title,
            description,
            included,
            group_size,
            contact,
            duration,
            category,
            contactName,
            contactEmail,
            contactNumber,
          } = values;
          const updateValues = {
            title: title.trim(),
            description,
            publicData: {
              included,
              group_size_min: group_size[0],
              group_size_max: group_size[1],
              contact,
              duration,
              contactName,
              contactEmail,
              contactNumber,
              category
            }
          };

          onSubmit(updateValues);
        }}
        onChange={onChange}
        updated={panelUpdated}
        updateError={errors.updateListingError}
        updateInProgress={updateInProgress}
        group_size_brackets={config.custom.group_size_brackets}
        categories={config.custom.categories}
        groupSize={publicData.group_size_min && publicData.group_size_max ? [publicData.group_size_min, publicData.group_size_max] : [1, 31]}
      />
    </div>
  );
};

const { func, object, string, bool } = PropTypes;

EditListingDescriptionPanel.defaultProps = {
  className: null,
  rootClassName: null,
  listing: null
};

EditListingDescriptionPanel.propTypes = {
  className: string,
  rootClassName: string,

  // We cannot use propTypes.listing since the listing might be a draft.
  listing: object,

  onSubmit: func.isRequired,
  onChange: func.isRequired,
  submitButtonText: string.isRequired,
  panelUpdated: bool.isRequired,
  updateInProgress: bool.isRequired,
  errors: object.isRequired
};

export default EditListingDescriptionPanel;
