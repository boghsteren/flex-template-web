import React from 'react';
import { arrayOf, bool, func, node, object, shape, string } from 'prop-types';
import classNames from 'classnames';
import { Form as FinalForm } from 'react-final-form';
import { injectIntl, intlShape } from 'react-intl';
import arrayMutators from 'final-form-arrays';

import { FieldTextInput, Form } from '../../components';
import css from './InputTextFilterForm.css';

const InputTextFilterFormComponent = props => {
  return (
    <FinalForm
      {...props}
      initialValues={props.initialValues}
      mutators={{ ...arrayMutators }}
      render={formRenderProps => {
        const {
          form,
          handleSubmit,
          id,
          name,
          onClear,
          onCancel,
          options,
          isOpen,
          contentRef,
          style,
          intl,
          type,
        } = formRenderProps;
        const classes = classNames(css.root, { [css.isOpen]: isOpen });

        const handleCancel = () => {
          // reset the final form to initialValues
          form.reset();
          onCancel();
        };

        const clear = intl.formatMessage({ id: 'InputTextFilterForm.clear' });
        const cancel = intl.formatMessage({ id: 'InputTextFilterForm.cancel' });
        const submit = intl.formatMessage({ id: 'InputTextFilterForm.submit' });
        return (
          <Form
            className={classes}
            onSubmit={handleSubmit}
            tabIndex="0"
            contentRef={contentRef}
            style={style}
          >
            <FieldTextInput
              className={css.fieldGroup}
              name={name}
              id={`${id}-input-text`}
              type={type}
            />
            <div className={css.buttonsWrapper}>
              <button className={css.clearButton} type="button" onClick={onClear}>
                {clear}
              </button>
              <button className={css.cancelButton} type="button" onClick={handleCancel}>
                {cancel}
              </button>
              <button className={css.submitButton} type="submit">
                {submit}
              </button>
            </div>
          </Form>
        );
      }}
    />
  );
};

InputTextFilterFormComponent.defaultProps = {
  contentRef: null,
  style: null,
};

InputTextFilterFormComponent.propTypes = {
  id: string.isRequired,
  name: string.isRequired,
  onClear: func.isRequired,
  onCancel: func.isRequired,
  isOpen: bool.isRequired,
  contentRef: func,
  style: object,

  // form injectIntl
  intl: intlShape.isRequired,
};

const InputTextFilterForm = injectIntl(InputTextFilterFormComponent);

export default InputTextFilterForm;
