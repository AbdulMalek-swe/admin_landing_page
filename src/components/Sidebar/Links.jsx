import { ReactNode, useState } from 'react';

 

const SidebarLinkGroup = ({
  children,
  activeCondition,
} ) => {
  const [open, setOpen] = useState(activeCondition);

  const handleClick = () => {
    setOpen(!open);
  };

  return <span>{children(handleClick, open)}</span>;
};

export default SidebarLinkGroup;