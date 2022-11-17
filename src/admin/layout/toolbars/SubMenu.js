import { useState } from 'react';
import {
    List,
    ListItemIcon,
    Typography,
    Collapse,
    ListItem,
    Tooltip,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Link } from 'react-router-dom';
import {
  useCreatePath
} from '@alkuip/core';
import { getNavigationQuery } from '../../util';

/**
 * Submenu
 * @param {*} props 
 * @returns 
 */
export const SubMenu = (props) => {
    const { 
        handleToggle, 
        name, 
        page,
        children, 
        dense,
        isOpen
    } = props;
    const [open,setOpen ] = useState(isOpen);
    const createPath = useCreatePath();
    const handleChange = _e=>{
        setOpen(!open);
        handleToggle({ type: 'UPDATE_APP_UISCHEMA', payload:{
            app: page,
            query: getNavigationQuery(page)
        }}) 
    }
    const header = name?(
        <ListItem 
            dense={dense} 
            onClick={handleChange}
            alignItems = { 'flex-start'}
        >
            <ListItemIcon sx={{ minWidth: 5 }}>
                {open ? <ExpandMoreIcon /> : <ExpandLessIcon/>}
            </ListItemIcon>
                <Link to={  
                    createPath({
                        resource: `/${page?.appId}/dashboard?action=dashboard`,
                        type: 'list',
                    }) } 
                >
                <Typography variant="inherit" color="textSecondary">
                    {name }
                </Typography>
            </Link>
        </ListItem>
    ):null;

    return (
        <div>
            { open ? (
                header
            ) : (
                <Tooltip title={ name } placement="right">
                    {header}
                </Tooltip>
            )}
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List
                    dense={dense}
                    component="div"
                    disablePadding
                    sx={{
                        '& a': {
                            transition:
                                'padding-left 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
                            paddingLeft: 2,
                        },
                    }}
                >
                    {children}
                </List>
            </Collapse>
        </div>
    );
};

export default SubMenu;