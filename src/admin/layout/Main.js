import { useState } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { useMediaQuery, useTheme,Grid, Container } from '@mui/material';

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
const content = theme => css`
    height: 100%;
    width: 100%;
    overflow-x: auto;
    background-color: ${ theme.palette.white };
  `;
  const sidebar = theme => css`
    height: 100%;
    background-color: ${ theme.palette.primary.light };
  `;
const banner= theme =>css({
  minHeight: '48px',
  marginBottom: '3%',
  backgroundColor: `${ theme.palette.primary.main }`
});
const footer= theme =>css({
  backgroundColor: `${ theme.palette.primary.light }`
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
      <Grid item  css={ banner}>
        <Container>
          {/*<Topbar onSidebarOpen={handleSidebarOpen} />*/}
          banner
        </Container>
      </Grid>
      <Grid 
        item 
        container 
        spacing ={ 2 }
        direction="row"
        justifyContent="flex-start"
        alignItems="stretch"
      >
        <Grid item>
          <Container  css={ sidebar(theme)}>
            This is sidebar
          </Container>          
        </Grid>
        <Grid item>
          <Container css={ content(theme)}>
            This is children
          </Container>
        </Grid>
      </Grid>
      <Grid item css={ footer(theme)}>
          <Footer/>
      </Grid>
    </Grid>
  );
}

Main.propTypes = {
  children: PropTypes.node
};

export default Main;
