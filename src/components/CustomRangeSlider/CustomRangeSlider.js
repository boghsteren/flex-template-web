import React, { Component } from 'react';
import { arrayOf, number, shape, string } from 'prop-types';
import classNames from 'classnames';
import { withDimensions } from '../../util/contextHelpers';
import config from '../../config';

import Handle from './Handle';
import Track from './Track';
import css from './CustomRangeSlider.css';
import { FieldTextInput, ExpandingTextarea } from '../../components';

class CustomRangeSliderComponent extends Component {
  constructor(props) {
    super(props);

    const { min, max, handles } = props;
    handles.forEach((h, index) => {
      if (h < min || h > max || (index < handles.length - 1 && h > handles[index + 1])) {
        throw new Error(
          'CustomRangeSlider error: handles need to be given in ascending order and they need to be within min and max values'
        );
      }
    });

    this.state = { activeHandle: 0, currentMin: handles[0], currentMax: handles[1] };

    this.toPosition = this.toPosition.bind(this);
    this.toValue = this.toValue.bind(this);
    this.changeActive = this.changeActive.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  toPosition(value) {
    const { dimensions, min, max } = this.props;
    const width = dimensions.width;
    const valueOffset = value - min;
    const scale = max - min;
    return Math.round((valueOffset / scale) * width);
  }

  toValue(position) {
    const { dimensions, min, max, step } = this.props;
    const width = dimensions.width;
    const scale = max - min;
    const value = Math.round((position / width) * scale) + min;
    return Math.ceil(value / step) * step;
  }

  changeActive(index) {
    this.setState({ activeHandle: index });
  }

  onChange(position, handleIndex) {
    const pos = Object.assign([...this.props.handles]);
    this.setState({
      currentMin: pos[0],
      currentMax: pos[1]
    });
    this.props.onChange(Object.assign([...this.props.handles], { [handleIndex]: position }));
  }

  render() {
    const { handles, min, max, oneDirection, unitType, isGroupSize, moreInfo } = this.props;

    const { rootClassName, className } = this.props;
    const classes = classNames(rootClassName || css.root, className);

    return (
      <div className={classes}>
        <div className={css.displayInline}>
          <div className={css.overLengthWrapper}>
            <input
              className={css.minUnit}
              value={this.state.currentMin}
              readOnly={true}
            />
            <p className={css.unitDash}>-</p>
            <input
              className={css.maxUnit}
              value={this.state.currentMax}
              readOnly={true}
            />
            {isGroupSize && this.state.currentMax >= config.custom.MAX_GROUP_SIZE_SLIDER &&
              <div className={css.overLength}>+</div>
            }
          </div>
          <p className={css.unitText}>{unitType}</p>
        </div>
        <div className={css.moreInfo}>{moreInfo}</div>
        <Track handles={handles} valueToPosition={this.toPosition}>
          {handles.map((h, index) => {
            const classes = classNames({ [css.activeHandle]: this.state.activeHandle === index });
            return (
              <div key={index}>
                <Handle
                  key={index}
                  className={classes}
                  value={h}
                  min={index === 0 ? min : handles[index - 1]}
                  max={index === handles.length - 1 ? max : handles[index + 1]}
                  valueToPosition={this.toPosition}
                  positionToValue={this.toValue}
                  changeActive={() => this.changeActive(index)}
                  onChange={value => {
                    if ((oneDirection && index === 1) || !oneDirection) {
                      this.onChange(value, index)
                    }
                  }}
                />

              </div>
            );
          })}
        </Track>
      </div>
    );
  }
}

CustomRangeSliderComponent.defaultProps = {
  min: 0,
  max: 10000000,
  step: 1,
  rootClassName: null,
  className: null,
};

CustomRangeSliderComponent.propTypes = {
  handles: arrayOf(number),
  min: number,
  max: number,
  step: number,
  rootClassName: string,
  className: string,
  dimensions: shape({
    height: number.isRequired,
    width: number.isRequired,
  }).isRequired,
};

const CustomRangeSliderComponentWithDimensions = withDimensions(CustomRangeSliderComponent);

const CustomRangeSlider = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);
  return (
    <div className={classes}>
      <CustomRangeSliderComponentWithDimensions {...props} />
    </div>
  );
};

CustomRangeSlider.defaultProps = {
  rootClassName: null,
  className: null,
};

CustomRangeSlider.propTypes = {
  rootClassName: string,
  className: string,
};

export default CustomRangeSlider;
