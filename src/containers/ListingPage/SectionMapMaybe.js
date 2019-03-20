import React, { Component } from 'react';
import { string } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import { obfuscatedCoordinates } from '../../util/maps';
import { Map } from '../../components';
import config from '../../config';

import css from './ListingPage.css';

class SectionMapMaybe extends Component {
  constructor(props) {
    super(props);
    this.state = { isStatic: true };
  }

  render() {
    const { className, rootClassName, geolocation, publicData, listingId, currentUser } = this.props;

    if (!geolocation) {
      return null;
    }

    const address = publicData.location ? publicData.location.address : '';
    const classes = classNames(rootClassName || css.sectionMap, className);
    const cacheKey = listingId ? `${listingId.uuid}_${geolocation.lat}_${geolocation.lng}` : null;

    const mapProps = config.maps.fuzzy.enabled
      ? { obfuscatedCenter: obfuscatedCoordinates(geolocation, cacheKey) }
      : { address, center: geolocation };
    const map = <Map {...mapProps} useStaticMap={this.state.isStatic} currentUser={currentUser} />;

    return (
      <div className={classes}>
        {currentUser && publicData.location &&
          <div className={css.sectionFeatures}>
            <h2 className={css.descriptionTitle}>
              <FormattedMessage id="ListingPage.tourStartAddressTitle" />
            </h2>
            {publicData.location.building &&
              <p className={css.description}>Building {publicData.location.building}</p>
            }
            <p className={css.description}>{publicData.location.address}</p>
          </div>
        }
        <h2 className={css.locationTitle}>
          <FormattedMessage id="ListingPage.locationTitle" />
        </h2>
        {this.state.isStatic ? (
          <button
            className={css.map}
            onClick={() => {
              this.setState({ isStatic: false });
            }}
          >
            {map}
          </button>
        ) : (
            <div className={css.map}>{map}</div>
          )}
      </div>
    );
  }
}

SectionMapMaybe.defaultProps = {
  rootClassName: null,
  className: null,
  geolocation: null,
  listingId: null,
};

SectionMapMaybe.propTypes = {
  rootClassName: string,
  className: string,
  geolocation: propTypes.latlng,
  listingId: propTypes.uuid,
};

export default SectionMapMaybe;
