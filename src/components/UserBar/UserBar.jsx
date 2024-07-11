import css from '../UserBar/UserBar.module.css';
import UserBarPopover from '../../components/UserBarPopover/UserBarPopover';
import { IoIosArrowDown } from 'react-icons/io';
import { IoIosArrowUp } from 'react-icons/io';
import { RxAvatar } from 'react-icons/rx';
import { Popover } from 'react-tiny-popover';
import { useState } from 'react';
export default function UserBar() {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <Popover
      isOpen={isPopoverOpen}
      positions={['bottom']}
      onClickOutside={() => setIsPopoverOpen(!isPopoverOpen)}
      content={<UserBarPopover />}
    >
      <button
        className={css.btn}
        onClick={() => setIsPopoverOpen(!isPopoverOpen)}
      >
        <p className={css.name}>Username</p>
        <RxAvatar />
        {isPopoverOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </button>
    </Popover>
  );
}
