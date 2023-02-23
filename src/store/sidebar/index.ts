import { atom, useRecoilState } from 'recoil';

import type { Actions } from './types';

const sidebarIsOpenState = atom<boolean>({
  key: 'sidebar-openness-state',
  default: false,
});

export const useSidebar= (): [boolean, Actions]=>{
  const [isOpen, setIsOpen] = useRecoilState(sidebarIsOpenState);

  const toggle =()=> {
    setIsOpen((isOpen: boolean) => !isOpen);
  }

  const close =()=> {
    setIsOpen(false);
  }

  const open =()=> {
    setIsOpen(true);
  }

  return [isOpen, { toggle, close, open }];
}

export default useSidebar;
