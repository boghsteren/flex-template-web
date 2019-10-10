import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from 'react-intl';
import classNames from "classnames";
import css from "./SectionValuesYourClients.css";
import impactReport from '../../assets/report.pdf'
import impactReportImg from '../../assets/reportImg.png';
import Modal from '../Modal/Modal';
import { compose } from 'redux';
import { withViewport } from '../../util/contextHelpers';
import { isTablet } from '../../util/userAgent';

const DEVICE_BREAKPOINT = 1024;

class SectionValuesYourClients extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showReport: false,
    }
  }
  showReport = () => {
    this.setState({
      showReport: true
    })
  };

  render() {
    const { rootClassName, className, onManageDisableScrolling, viewport } = this.props;
    const isTabletDevice = isTablet();
    const isMobileLayout = viewport.width <= DEVICE_BREAKPOINT || isTabletDevice;
    const classes = classNames(rootClassName || css.root, className, css.sectionContainer);

    return (
      <div className={classes} key="somekey">
        <div className={css.content}>
          <div className={css.title}>
            <FormattedMessage id="SectionValuesYourClients.title"/>
          </div>
          <ul className={css.valuesList}>
            <li><FormattedMessage id="SectionValuesYourClients.value1"/></li>
            <li><FormattedMessage id="SectionValuesYourClients.value2"/></li>
            <li><FormattedMessage id="SectionValuesYourClients.value3"/></li>
          </ul>
        </div>
        {isMobileLayout ?
          <div className={css.impactReport}>
            <a href={impactReport} target="_blank">
              <img src={impactReportImg} onClick={this.showReport}/>
            </a>
          </div>
        :
          <div className={css.impactReport}>
            <img src={impactReportImg} onClick={this.showReport}/>
            <Modal
              id='report-modal'
              closeClassName={css.btnClose}
              contentClassName={css.reportModalContent}
              containerClassName={css.reportModalContainer}
              isOpen={this.state.showReport}
              onClose={() => {
                this.setState({ showReport: false });
              }}
              onManageDisableScrolling={onManageDisableScrolling}
            >
              <embed src={impactReport} type="application/pdf" className={css.reportEmbed}/>
            </Modal>
          </div>
        }

      </div>
    );
  }
}

SectionValuesYourClients.defaultProps = {
  rootClassName: null,
  className: null
};

const { string } = PropTypes;

SectionValuesYourClients.propTypes = {
  rootClassName: string,
  className: string
};

export default compose(withViewport)(SectionValuesYourClients);
