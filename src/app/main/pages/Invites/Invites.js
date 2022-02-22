import { useRef } from 'react';
import FusePageCarded from '@fuse/core/FusePageCarded';
import InvitesHeader from './InvitesHeader';
import InvitesContent from './InvitesContent';

function Invites(props) {
  const pageLayout = useRef(null);

  return (
    <FusePageCarded
      classes={{
        root: 'w-full',
        content: 'flex flex-col',
        header: 'items-center min-h-72 h-72 sm:h-136 sm:min-h-136',
      }}
      header={<InvitesHeader pageLayout={pageLayout} />}
      content={<InvitesContent />}
      ref={pageLayout}
      innerScroll
    />
  );
}

export default Invites;
