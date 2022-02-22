import { useRef } from 'react';
import FusePageCarded from '@fuse/core/FusePageCarded';
import MyComputerHeader from './MyComputerHeader';
import MyComputerContent from './MyComputerContent';

function MyComputer(props) {
  const pageLayout = useRef(null);
  const isOther = props.match.params.isother && props.match.params.isother === '1' ? 1 : 0;

  return (
    <FusePageCarded
      classes={{
        root: 'w-full',
        content: 'flex flex-col',
        header: 'items-center min-h-72 h-72 sm:h-136 sm:min-h-136',
      }}
      header={<MyComputerHeader pageLayout={pageLayout} />}
      content={<MyComputerContent isOther={isOther} />}
      ref={pageLayout}
      innerScroll
    />
  );
}

export default MyComputer;
