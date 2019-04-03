import React, { Component } from 'react';
import { array, number, func, string } from 'prop-types';
import classNames from 'classnames';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import { InputTextFilterPlainForm } from '../../forms';

import css from './InputTextFilterPlain.css';

class InputTextFilterPlainComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: true };

    this.handleSelect = this.handleSelect.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.toggleIsOpen = this.toggleIsOpen.bind(this);
  }

  handleSelect(values) {
    const { urlParam, name, onSelect } = this.props;
    const paramValues = values[name];
    onSelect(urlParam, paramValues);
  }

  handleClear() {
    const { urlParam, onSelect } = this.props;
    onSelect(urlParam, null);
  }

  toggleIsOpen() {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  }

  render() {
    const {
      rootClassName,
      className,
      id,
      name,
      label,
      initialValues,
      intl,
    } = this.props;

    const classes = classNames(rootClassName || css.root, className);

    const hasInitialValues = !!initialValues;
    const labelClass = hasInitialValues ? css.filterLabelSelected : css.filterLabel;

    const labelText = hasInitialValues
      ? intl.formatMessage(
          { id: 'InputTextFilterPlainForm.labelSelected' },
          { labelText: label, count: initialValues }
        )
      : label;

    const optionsContainerClass = classNames({
      [css.optionsContainerOpen]: this.state.isOpen,
      [css.optionsContainerClosed]: !this.state.isOpen,
    });

    const namedInitialValues = { [name]: initialValues };

    return (
      <div className={classes}>
        <div className={labelClass}>
          <button type="button" className={css.labelButton} onClick={this.toggleIsOpen}>
            <span className={labelClass}>{labelText}</span>
          </button>
          <button type="button" className={css.clearButton} onClick={this.handleClear}>
            <FormattedMessage id={'InputTextFilterPlainForm.clear'} />
          </button>
        </div>
        <InputTextFilterPlainForm
          id={id}
          className={optionsContainerClass}
          name={name}
          type="number"
          initialValues={namedInitialValues}
          onChange={this.handleSelect}
          enableReinitialize
          keepDirtyOnReinitialize
        />
      </div>
    );
  }
}

InputTextFilterPlainComponent.defaultProps = {
  rootClassName: null,
  className: null,
  initialValues: [],
};

InputTextFilterPlainComponent.propTypes = {
  rootClassName: string,
  className: string,
  id: string.isRequired,
  name: string.isRequired,
  urlParam: string.isRequired,
  label: string.isRequired,
  onSelect: func.isRequired,
  initialValues: number,

  // from injectIntl
  intl: intlShape.isRequired,
};

const InputTextFilterPlain = injectIntl(InputTextFilterPlainComponent);

export default InputTextFilterPlain;
