import { css } from '@emotion/react';
import { 
    useTheme
} from '@mui/material';
import { AppBar as DefaultAppBar } from './AppBar';
//import { Sidebar as DefaultSidebar } from './Sidebar';
//import { Menu as DefaultMenu } from './Menu';
//import { useSidebarState } from './useSidebarState';
import { 
    Footer as DefaultFooter,
    SidebarNav as DefaultMenu,
    Sidebar as DefaultSidebar
 } from './toolbars';
export const Layout = (props) => {
    const {
        appBar: AppBar = DefaultAppBar,
        children,
        className,
        dashboard,
        error,
        menu: Menu = DefaultMenu,
        sidebar: Sidebar = DefaultSidebar,
        footer: Footer = DefaultFooter
    } = props;
    const theme = useTheme();
    return (
        <div css={ main(theme)}>
            { children}
        </div>
           
    );
};
const main = theme =>css({
    minHeight: '100%',
    backgroundColor: theme.palette.background.default
});

