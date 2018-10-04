import React from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { Form as FinalForm } from "react-final-form";
import { intlShape, injectIntl, FormattedMessage } from "react-intl";
import classNames from "classnames";
import { propTypes } from "../../util/types";
import { Form, Button, FieldTextInput } from "../../components";

import css from "./EditListingAvailabilityForm.css";

export const EditListingAvailabilityFormComponent = props => (
  <FinalForm
    {...props}
    render={fieldRenderProps => {
      const {
        className,
        disabled,
        handleSubmit,
        intl,
        invalid,
        pristine,
        saveActionMsg,
        updated,
        updateError,
        updateInProgress
      } = fieldRenderProps;

      const rulesLabelMessage = intl.formatMessage({
        id: "EditListingAvailabilityFormComponent.availabilityLabel"
      });
      const rulesPlaceholderMessage = intl.formatMessage({
        id: "EditListingAvailabilityFormComponent.availabilityPlaceholder"
      });

      const errorMessage = updateError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingAvailabilityFormComponent.updateFailed" />
        </p>
      ) : null;

      const classes = classNames(css.root, className);
      const submitReady = updated && pristine;
      const submitInProgress = updateInProgress;
      const submitDisabled = invalid || disabled || submitInProgress;

      return (
        <Form className={classes} onSubmit={handleSubmit}>
          {errorMessage}

          <FieldTextInput
            id="availability"
            name="availability"
            className={css.policy}
            type="textarea"
            label={rulesLabelMessage}
            placeholder={rulesPlaceholderMessage}
          />

          <Button
            className={css.submitButton}
            type="submit"
            inProgress={submitInProgress}
            disabled={submitDisabled}
            ready={submitReady}
          >
            {saveActionMsg}
          </Button>
        </Form>
      );
    }}
  />
);

EditListingAvailabilityFormComponent.defaultProps = {
  selectedPlace: null,
  updateError: null
};

const { func, string, bool } = PropTypes;

EditListingAvailabilityFormComponent.propTypes = {
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  selectedPlace: propTypes.place,
  updated: bool.isRequired,
  updateError: propTypes.error,
  updateInProgress: bool.isRequired
};

export default compose(injectIntl)(EditListingAvailabilityFormComponent);
