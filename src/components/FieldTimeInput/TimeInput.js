import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { string, array } from 'prop-types';
import classNames from 'classnames';
import config from '../../config';
import { TIME_OF_EVENT } from '../../util/dates';

import css from './TimeInput.css';

class TimeInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenTimePanel: false
    }
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClick)
  }
  
  componentWillUnmount() {
    // important
    document.removeEventListener('click', this.handleClick)
  }

  handleClick = (event) => {
    const { target } = event
    if (!this.node.contains(target)) {
      this.handleCloseTimePanel();
    }
  }
 

  handleOpenTimePanel = () => {
    this.setState({
      isOpenTimePanel: true
    });
  }

  handleCloseTimePanel = () => {
    this.setState({
      isOpenTimePanel: false
    });
  }

  handleChooseTime = (key, disabled) => {
    if (disabled) {
      return;
    }
    const {
      form,
      name
    } = this.props;
    form.change(name, key);
    this.handleCloseTimePanel();
  }

  render() {
    const {
      rootClassName,
      className,
      inputClassName,
      placeholderText,
      onChange,
      onBlur,
      onFocus,
      value,
      onFocusChange,
      timeSlotList,
      availableTimeSlot,
      ...rest
    } = this.props;

    const classes = classNames(rootClassName || css.root, className);

    const timeSlots = timeSlotList.map(timeSlot => {
      const newTimeSlot = {...timeSlot};

      newTimeSlot && availableTimeSlot && availableTimeSlot.filter(timeSlotFiltered => {
        return timeSlotFiltered.key === newTimeSlot.key;
      }).length === 0 ?
      newTimeSlot.disabled = true : null;
      
      return newTimeSlot;
    });

    return (
      <div className={classes}>
        <div className={css.showTime} ref={node => this.node = node}>
          <input
            {...rest}
            readOnly={true}
            className={inputClassName}
            type="text"
            autoComplete="off"
            placeholder={placeholderText}
            value={value}
            onChange={(e) => {
              onChange(e);
            }}
            onBlur={(e) => {
              onBlur(e);
              onFocusChange ? onFocusChange(null) : null;
            }}
            onFocus={(e) => {
              onFocus(e);
              this.handleOpenTimePanel();
              onFocusChange ? onFocusChange(TIME_OF_EVENT) : null;
            }}
          />
          {this.state.isOpenTimePanel &&
            <div className={css.timePanel} >
              {timeSlots.map(item => (
                <div className={classNames(css.timeItem, item.key === value ? css.selectedTime : css.null, item.disabled ? css.disabledTime : css.null)} key={item.key} onClick={() => this.handleChooseTime(item.key, item.disabled)}>
                  {item.label}
                </div>
              ))}
            </div>
          }
        </div>
      </div>
    );
  }
}

TimeInput.defaultProps = {
  rootClassName: null,
  className: null,
  timeSlotList: config.custom.timeSlotList
}

TimeInput.propTypes = {
  rootClassName: string,
  className: string,
  timeSlotList: array
}

export default TimeInput;