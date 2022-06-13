import React, { forwardRef, useState } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { List, ListItem, Button, colors, Hidden, useTheme } from '@mui/material';
import { 
    useLoginUser, 
    getDifference,
    nativeFilterItems 
} from '@alkuip/core';

const  item = css`
    display: flex;
    padding-top: 0;
    padding-bottom: 0;
  `;
const button = (theme) =>css`
    color: ${ colors.blueGrey[800]};
    padding: 10px 8px;
    justify-content: flex-start;
    text-transform: none;
    letter-spacing: 0;
    width: 100%;
    font-weight: ${ theme.typography.fontWeightMedium};
  `;
const icon = theme => css`
    color: ${ theme.palette.icon};
    width: 24;
    height: 24;
    display: flex;
    align-items: center;
    margin-right: ${ theme.spacing(1)};
  `;
const active =theme =>css`
    color: ${ theme.palette.primary.main};
    font-weight: ${ theme.typography.fontWeightMedium};
    '& $icon': {
      color: ${ theme.palette.primary.main};
    };
  `;

export const CustomRouterLink = forwardRef((props, ref) =>{
  return(
    <div
      ref={ref}
      style={{ flexGrow: 1 }}
    >
      <RouterLink {...props} />
    </div>
  )
  });

export const Menu = props => {
  const { pages, className, ...rest } = props;
  const { permissions } = useLoginUser();
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const handleClick = () => {
    setOpen(!open);
  };
  const isPageAdmin = (permissions.isAppAdmin || permissions.isSuperAdmin);
  
  const adminPages = nativeFilterItems(pages,'isAdmin',true);
  const nonAdminPages = nativeFilterItems(pages,'isUser',true);
  const userPages = getDifference(nonAdminPages,adminPages);
  return (
    <List
      {...rest}
      css={className}
    >
      {
      adminPages.map((page,index) => (
        <Hidden xsUp={ !isPageAdmin } key={ `hidden-admin-${page.title}-${index}`} >
          <ListItem
            css={item}
            disableGutters
            key={ `page-admin-${page.title}-${index}`}
          >
          {
            page.type === 'external'?

            (
              <a href={page.path} target="_blank" rel="noopener noreferrer">
                <Button
                  activeclassname={ active(theme)}
                  css={button(theme)}
                  key={ `page-admin-${page.title}-${index}`}
                >
                  <div css={icon(theme)}>{page.icon}</div>
                  {page.title}
                </Button>
              </a>
            ):(
              <Button
                activeclassname={active(theme)}
                css={button(theme)}
                component={CustomRouterLink}
                to={ page.path}
                key={ `page-admin-${page.title}-${index}`}
              >
                <div css={icon(theme)}>{page.icon}</div>
                {page.title}
              </Button>
            )
          }
          </ListItem>
        </Hidden>
      ))}

      {userPages.map((page,index) => (
        <ListItem
          css={item}
          disableGutters
          key={ `page-${page.title}-${index}`}
        >
        {
          page.type === 'external'?

          (
            <a href={page.path} target="_blank" rel="noopener noreferrer">
              <Button
                activeclassname={active(theme)}
                css={button(theme)}
                key={ `page-${page.title}-${index}`}
              >
                <div css={icon(theme)}>{page.icon}</div>
                {page.title}
              </Button>
            </a>
          ):(
            <Button
              activeclassname={active(theme)}
              css={button(theme)}
              component={CustomRouterLink}
              to={ page.path }
              key={ `page-${page.title}-${index}`}
            >
              <div css={icon(theme)}>{page.icon}</div>
              {page.title}
            </Button>
          )
        }
        </ListItem>
      ))}
    </List>
  );
};

Menu.propTypes = {
  className: PropTypes.string,
  pages: PropTypes.array.isRequired
};
