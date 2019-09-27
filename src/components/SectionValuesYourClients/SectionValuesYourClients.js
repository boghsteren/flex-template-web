import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import classNames from "classnames";
import css from "./SectionValuesYourClients.css";
import impactReport from '../../assets/report.pdf'
import impactReportImg from '../../assets/reportImg.png';
import Modal from '../Modal/Modal';

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
    const { rootClassName, className, onManageDisableScrolling } = this.props;

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

export default SectionValuesYourClients;
