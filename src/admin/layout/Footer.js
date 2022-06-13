import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { Typography, useTheme } from '@mui/material';

const img = css`
  height:22px!important;
  margin-left:3px;
  vertical-align:text-bottom;
  padding: 0 8px;
  `;
const license= css`
  display:inline-block;
  padding: 8px
  `;
const Footer = props => {
  const { className, ...rest } = props;
  const theme = useTheme();
  return (
    <div
      {...rest}
      css={css(css`
      padding: ${theme.spacing(2)};
      margin-bottom: 16px;
      margin-top: 56px;
      margin-left:218px;
    `, className)}
    >
      <Typography variant="body1" xmlnscc="https://creativecommons.org/ns#" xmlnsdct="https://purl.org/dc/terms/">
          <a property="dct:title" rel="cc:attributionURL" href="https://nataaha.com">ALKIP Platform</a> by <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://nataahahotels.com">Nataaha Hotels</a> is licensed under <a href="http://creativecommons.org/licenses/by-nc/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" css={ license }>CC BY-NC 4.0
          <img css={img}
            src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"/><img css={img} src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"/><img css={img} src="https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1"/></a>
      </Typography>
    </div>
  );
};

Footer.propTypes = {
  className: PropTypes.string
};

export default Footer;
