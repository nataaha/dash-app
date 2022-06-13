import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { useMediaQuery, useTheme } from '@mui/material';

import { 
  Sidebar, 
  Topbar, 
  Footer
} from '../toolbars';

const root = theme => css`
padding-top: 56px;
height: 100%;
[${theme.breakpoints.up('sm')}]: {
  padding-top: 64px;
}
`;
const shiftContent =css({
    paddingLeft: 240,
    paddingTop: 64,
});
  
const content = css`
    height: 100%;
    width: 100%;
    overflow-x: auto;
  `;
const Main = props => {
  const { children, routes } = props;
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true
  });
  const [openSidebar, setOpenSidebar] = useState(false);
  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };
  const shouldOpenSidebar = isDesktop ? true : openSidebar; 

  return (
    <div
      css={ isDesktop?[root(theme),shiftContent]:root(theme) }
    >
      <Topbar onSidebarOpen={handleSidebarOpen} />
      <Sidebar
        routes= { routes }
        onClose={handleSidebarClose}
        open={shouldOpenSidebar}
        variant={isDesktop ? 'persistent' : 'temporary'}
      />
      <div css={content}>
        { children }
      </div>
      <Footer />
    </div>
  );
}

Main.propTypes = {
  children: PropTypes.node
};

export default Main;
