import React from 'react';
import classNames from 'classnames';
import { NamedLink, AvatarLarge, AvatarMedium } from '../../components';

import css from './ListingPage.css';

const SectionAvatar = props => {
  const { user, params, currentUser } = props;
  return (
    <div className={css.sectionAvatar}>
      <NamedLink name="ListingPage" params={params} to={{ hash: currentUser ? '#host' : '' }} className={css.avatarNamedLink}>
        <AvatarLarge user={user} className={classNames(css.avatarDesktop, currentUser ? css.null : css.blurAvatar)} disableProfileLink />
      </NamedLink>
      <NamedLink name="ListingPage" params={params} to={{ hash: currentUser ? '#host' : '' }}>
        <AvatarMedium user={user} className={classNames(css.avatarMobile, currentUser ? css.null : css.blurAvatar)} disableProfileLink />
      </NamedLink>
    </div>
  );
};

export default SectionAvatar;
