import { useState } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { useMediaQuery, useTheme,Grid } from '@mui/material';

import { 
  Sidebar, 
  Topbar, 
  Footer
} from './toolbars';

const root = theme => css`
height: 100%;
[${theme.breakpoints.up('sm')}]: {
  padding-top: 0px;
}
`;
const shiftContent =css({
    paddingLeft: '12%',
    paddingTop: 0,
});
const menuCss = css({
  zIndex: 2
}); 
const content = css`
    height: 100%;
    width: 100%;
    overflow-x: auto;
  `;
const banner= css({
  minHeight: '48px',
  marginBottom: '3%'
})
export const Main = props => {
  const { children,...rest } = props;
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
    <Grid
      //css={ isDesktop?[root(theme),shiftContent]:root(theme) }
      container
      spacing ={ 2 }
      direction = "column"
      justifyContent="flex-start"
      alignItems="stretch"
    >
      <Grid item css={ banner}>
        <Topbar onSidebarOpen={handleSidebarOpen} />
      </Grid>
      <Grid 
        item 
        container 
        spacing ={ 2 }
        direction="row"
        justifyContent="flex-start"
        alignItems="stretch"
      >
        <Grid item xs={12} md={2} css={ menuCss }>
          <Sidebar
            { ...rest }
            onClose={handleSidebarClose}
            open={shouldOpenSidebar}
            variant={isDesktop ? 'persistent' : 'temporary'}
          />
        </Grid>
        <Grid item xs={12} md={10} css={content}>
          { children }
        </Grid>
      </Grid>
      <Grid item>
          <Footer/>
      </Grid>
    </Grid>
  );
}

Main.propTypes = {
  children: PropTypes.node
};

export default Main;
